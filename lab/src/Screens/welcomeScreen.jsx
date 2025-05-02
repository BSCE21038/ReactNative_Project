import React, { useEffect, useRef } from "react";
import { Animated, Image, TouchableOpacity, View } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import styles from "../styles";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const bounceAnim = useRef(new Animated.Value(0)).current;

  // 1) If already signed in, jump to MainApp immediately
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) navigation.replace("MainApp");
    });
    return unsub;
  }, [navigation]);

  // 2) Bounce animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceAnim]);

  // 3) When this screen comes into focus, set a 3s timer to go to SignIn
  useEffect(() => {
    if (!isFocused) return;
    const timer = setTimeout(() => {
      navigation.navigate("SignIn");
    }, 3000);
    return () => clearTimeout(timer);
  }, [isFocused, navigation]);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => navigation.navigate("SignIn")}
    >
      <Image
        source={require("../../assets/mainScreen.png")}
        style={styles.firstScreen}
      />
      <View style={styles.logoContainer}>
        <Animated.Image
          source={require("../../assets/white_logo.png")}
          style={[
            styles.firstLogo,
            { transform: [{ translateY: bounceAnim }] },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
}
