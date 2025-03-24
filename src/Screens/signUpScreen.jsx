// signUpScreen.jsx
import React, { useState, useCallback } from "react";
import {
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  View,
} from "react-native";
import styles from "../styles";
import CustomPressable from "../Components/CustomPressable";
import CustomTextInput from "../Components/CustomTextInput";
import CustomDropdown from "../Components/CustomDropdown";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { auth, db, WEB_CLIENT_ID } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";

// Configure Google Sign-In with your webClientId.
GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
});

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [role, setRole] = useState("");

  // Save user data to Firestore
  const saveUserToFirestore = async (user, customName = "") => {
    const userDoc = {
      name: customName || user.displayName || "",
      email: user.email,
      role: role,
    };
    await setDoc(doc(db, "users", user.uid), userDoc);
  };

  // Email/Password Sign-Up
  const handleEmailSignUp = () => {
    if (!isChecked) {
      Alert.alert(
        "Privacy Policy",
        "Please accept the Privacy Policy before proceeding."
      );
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await saveUserToFirestore(userCredential.user, name);
        navigation.navigate("MainApp");
      })
      .catch((error) => Alert.alert("Sign-Up Error", error.message));
  };

  // Google Sign-Up
  const handleGoogleSignUp = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { idToken } = userInfo;
      const googleCredential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, googleCredential);
      await saveUserToFirestore(userCredential.user, userInfo.user.name);
      navigation.navigate("MainApp");
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert("Google Sign-In Cancelled");
      } else {
        Alert.alert("Google Sign-In Error", error.message);
      }
    }
  };

  // Facebook Sign-Up
  const handleFacebookSignUp = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);
      if (result.isCancelled) {
        Alert.alert("Facebook Sign-In Cancelled");
        return;
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data)
        throw new Error("Facebook Sign-In failed to get access token");
      const facebookCredential = FacebookAuthProvider.credential(
        data.accessToken
      );
      const userCredential = await signInWithCredential(
        auth,
        facebookCredential
      );
      await saveUserToFirestore(
        userCredential.user,
        userCredential.user.displayName
      );
      navigation.navigate("MainApp");
    } catch (error) {
      Alert.alert("Facebook Sign-In Error", error.message);
    }
  };

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <ImageBackground
      source={require("../../assets/Mask.png")}
      style={styles.container}
    >
      <Icon
        name="arrow-back"
        size={30}
        color="#6A5ACD"
        style={styles.backIcon}
        onPress={handleBack}
      />
      <Image source={require("../../assets/logo.png")} style={styles.logo1} />
      <Text style={styles.mainHeading}>Create Your Account</Text>

      {/* Social Sign-Up Options */}
      <CustomPressable
        title="CONTINUE WITH FACEBOOK"
        icon={require("../../assets/Vector.png")}
        onPress={handleFacebookSignUp}
      />
      <CustomPressable
        title="CONTINUE WITH GOOGLE"
        icon={require("../../assets/Group6795.png")}
        onPress={handleGoogleSignUp}
      />

      <Text style={styles.orText}>OR SIGN UP WITH EMAIL</Text>

      <CustomTextInput value={name} onChangeText={setName} placeholder="Name" />
      <CustomTextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email Address"
      />
      <CustomTextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        isPassword
      />

      {/* Optional: Role selection dropdown */}
      <View>
        <CustomDropdown
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
        />
      </View>

      {/* Privacy Policy Checkbox */}
      <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxText}>
          I have read the{" "}
          <TouchableOpacity
            onPress={() => console.log("Privacy Policy Clicked")}
          >
            <Text style={styles.privacyPolicyLink}>Privacy Policy</Text>
          </TouchableOpacity>
        </Text>
        <TouchableOpacity
          style={[styles.checkbox, isChecked && styles.checkedBox]}
          onPress={() => setIsChecked(!isChecked)}
        >
          {isChecked && <Text style={styles.checkmark}>✔</Text>}
        </TouchableOpacity>
      </View>
      <CustomPressable title="SIGN UP" onPress={handleEmailSignUp} />
    </ImageBackground>
  );
}
