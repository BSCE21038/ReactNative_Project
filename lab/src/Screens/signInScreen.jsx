import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Text,
  Animated,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  ScrollView,
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
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
});

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateToSignUp = useCallback(() => navigation.navigate("SignUp"), [navigation]);
  const bounceAnim = useRef(new Animated.Value(0)).current;

  const handleEmailSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const userRole = userData.role;
          navigation.replace(userRole === "organizer" ? "OrganizerHome" : "MainApp");
        }
      })
      .catch((error) => Alert.alert("Login Error", error.message));
  };

  useEffect(() => {
          Animated.loop(
              Animated.sequence([
                  Animated.timing(bounceAnim, {
                      toValue: -10, // Move up
                      duration: 1500,
                      useNativeDriver: true,
                  }),
                  Animated.timing(bounceAnim, {
                      toValue: 0, // Move down
                      duration: 1500,
                      useNativeDriver: true,
                  }),
              ])
          ).start();
      }, []);

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

  const handleFacebookSignIn = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);
      if (result.isCancelled) throw new Error("Facebook Sign-In Cancelled");
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) throw new Error("Failed to get Facebook access token");
      const facebookCredential = FacebookAuthProvider.credential(data.accessToken);
      await signInWithCredential(auth, facebookCredential);
      navigation.replace("MainApp");
    } catch (error) {
      Alert.alert("Facebook Sign-In Error", error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={require("../../assets/Mask.png")} style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }} 
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}  
          showsHorizontalScrollIndicator={false} 
        >
            <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}>
              <Icon
                name="arrow-back"
                size={30}
                color="#6A5ACD"
                style={styles.backIcon}
                onPress={() => navigation.goBack()}
              />
              <Animated.Image 
                source={require("../../assets/logo.png")}
                style={[styles.logo1, { transform: [{ translateY: bounceAnim }] }]} 
              />
              <Text style={styles.mainHeading}>Welcome</Text>

              {/* <CustomPressable
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
              /> */}

              <Text style={styles.orText}>LOG IN WITH EMAIL</Text>

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

              <CustomPressable title="LOG IN" onPress={handleEmailSignIn} />
              <TouchableOpacity onPress={navigateToSignUp} style={styles.loginContainer}>
                <Text style={styles.loginText}>DON'T HAVE AN ACCOUNT? </Text>
                <Text style={styles.loginLink}>SIGN UP</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}
