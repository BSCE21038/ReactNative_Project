import React, { useEffect, useRef } from "react";
import { Animated, Image, TouchableOpacity, View, Easing } from "react-native";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("MainApp");
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  useEffect(() => {
    // Create a visible floating animation with smooth transitions
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -10, // Move up visibly
          duration: 1500, // Smooth speed
          easing: Easing.inOut(Easing.ease), // Soft and smooth transition
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 10, // Move down visibly
          duration: 2000, // Smooth speed
          easing: Easing.inOut(Easing.ease), // Soft and smooth transition
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

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

      {/* Animated Logo */}
      <View style={styles.logoContainer}>
        <Animated.Image
          source={require("../../assets/white_logo.png")}
          style={[styles.firstLogo, { transform: [{ translateY }] }]}
        />
      </View>
    </TouchableOpacity>
  );
}
