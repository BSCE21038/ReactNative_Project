import React, { useEffect } from "react";
import { ImageBackground, Image, TouchableOpacity, View } from "react-native";
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
      {/* Background Image */}
      <Image
        source={require("../../assets/mainScreen.png")}
        style={styles.firstScreen}
      />

      {/* Logo Positioned on Top */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/white_logo.png")}
          style={styles.firstLogo}
        />
      </View>
    </TouchableOpacity>
  );
}
