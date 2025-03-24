// welcomeScreen.jsx
import React, { useEffect } from "react";
import { ImageBackground, Image, TouchableOpacity } from "react-native";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Redirect to MainApp if the user is authenticated.
        navigation.replace("MainApp");
      }
    });
    return () => unsubscribe();
  }, [navigation]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("SignIn")}
    >
      <Image
        source={require("../../assets/welcome_bg.png")}
        style={styles.firstScreen}
      />
    </TouchableOpacity>
  );
}
