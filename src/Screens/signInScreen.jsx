// signInScreen.jsx
import React, { useState, useCallback } from "react";
import {
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "../styles";
import CustomPressable from "../Components/CustomPressable";
import CustomTextInput from "../Components/CustomTextInput";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { auth, WEB_CLIENT_ID, db } from "../../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  FacebookAuthProvider,
} from "firebase/auth";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";

// Configure Google Sign-In with your webClientId.
GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
});

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateToSignUp = useCallback(
    () => navigation.navigate("SignUp"),
    [navigation]
  );

  // Email/Password Sign-In
  const handleEmailSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userDoc = await getDoc(doc(db, "users", user.uid));
  
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const userRole = userData.role;
  
          // Navigate based on role
          navigation.replace(userRole === "organizer" ? "OrganizerHome" : "MainApp");
        }
      })
      .catch((error) => Alert.alert("Login Error", error.message));
  };
  

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(userInfo.idToken);
      await signInWithCredential(auth, googleCredential);
      navigation.replace("MainApp");
    } catch (error) {
      Alert.alert("Google Sign-In Error", error.message);
    }
  };

  // Facebook Sign-In
  const handleFacebookSignIn = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);
      if (result.isCancelled)
        throw new Error("Facebook Sign-In Cancelled");
      const data = await AccessToken.getCurrentAccessToken();
      if (!data)
        throw new Error("Failed to get Facebook access token");
      const facebookCredential = FacebookAuthProvider.credential(
        data.accessToken
      );
      await signInWithCredential(auth, facebookCredential);
      navigation.replace("MainApp");
    } catch (error) {
      Alert.alert("Facebook Sign-In Error", error.message);
    }
  };

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
        onPress={() => navigation.goBack()}
      />
      <Image source={require("../../assets/logo.png")} style={styles.logo1} />
      <Text style={styles.mainHeading}>Welcome</Text>

      <CustomPressable
        title="CONTINUE WITH FACEBOOK"
        onPress={handleFacebookSignIn}
        style={styles.socialButton}
        icon={require("../../assets/Vector.png")}
      />
      <CustomPressable
        title="CONTINUE WITH GOOGLE"
        onPress={handleGoogleSignIn}
        style={styles.socialButton}
        icon={require("../../assets/Group6795.png")}
      />

      <Text style={styles.orText}>OR LOG IN WITH EMAIL</Text>

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
      />

      <CustomPressable title="LOG IN" onPress={handleEmailSignIn} />
      <TouchableOpacity onPress={navigateToSignUp} style={styles.loginContainer}>
        <Text style={styles.loginText}>DON'T HAVE AN ACCOUNT? </Text>
        <Text style={styles.loginLink}>SIGN UP</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
