import React, { useEffect, useRef } from "react";
import { Animated, Image, TouchableOpacity, View, Easing } from "react-native";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("MainApp");
      }
    });

    return () => unsubscribe();
  }, [navigation]);

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
      <View style={styles.logoContainer}>
        <Animated.Image 
          source={require("../../assets/white_logo.png")}
          style={[styles.firstLogo, { transform: [{ translateY: bounceAnim }] }]} 
        />
      </View>
    </TouchableOpacity>
  );
}
