import React, { useCallback } from "react";
import { View, Text, ImageBackground, Image, TouchableOpacity } from "react-native";
import styles from "../styles";
import CustomPressable from "../Components/CustomPressable";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const navigateToSignUp = useCallback(() => navigation.navigate("SignUp"), [navigation]);
  const navigateToSignIn = useCallback(() => navigation.navigate("SignIn"), [navigation]);

  return (
    <ImageBackground source={require("../../assets/signup_signin_bg.png")} style={styles.container}>
      <Image source={require("../../assets/Group17.png")} style={styles.logo} />
      <Image source={require("../../assets/Frame1.png")} style={styles.overlay} />
      <Image source={require("../../assets/Group6.png")} style={styles.centerImage} />

      <Text style={styles.mainHeading}>We Are What We Do</Text>
      <Text style={styles.subText}>Thousands of people are using Silent Moon for small meditations.</Text>

      <CustomPressable title="SIGN UP" onPress={navigateToSignUp} />

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>ALREADY HAVE AN ACCOUNT? </Text>
        <TouchableOpacity onPress={navigateToSignIn}>
          <Text style={styles.loginLink}>LOG IN</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
