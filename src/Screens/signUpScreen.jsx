import React, { useState, useCallback } from "react";
import { View, Text, Image, ImageBackground, TouchableOpacity } from "react-native";
import styles from "../styles";
import CustomPressable from "../Components/CustomPressable";
import CustomTextInput from "../Components/CustomTextInput";
import CustomDropdown from "../Components/CustomDropdown";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [role, setRole] = useState('');

  const handleSignUp = useCallback(() => navigation.navigate("Home"), [navigation]);
  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <ImageBackground source={require("../../assets/Mask.png")} style={styles.container}>
      <Icon name="arrow-back" size={30} color="#6A5ACD" style={styles.backIcon} onPress={handleBack} />

       {/* new-Added Logo at the Top*/}
       <Image source={require("../../assets/logo.png")} style={styles.logo1} />

      <Text style={styles.mainHeading}>Create Your Account</Text>

      <CustomPressable title="CONTINUE WITH FACEBOOK" icon={require("../../assets/Vector.png")} />
      <CustomPressable title="CONTINUE WITH GOOGLE" icon={require("../../assets/Group6795.png")} />

      <Text style={styles.orText}>OR SIGN UP WITH EMAIL</Text>

      <CustomTextInput value={name} onChangeText={setName} placeholder="Name" />
      <CustomTextInput value={email} onChangeText={setEmail} placeholder="Email Address" />
      <CustomTextInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry isPassword />
      <View>
        <CustomDropdown selectedValue={role} onValueChange={(itemValue) => setRole(itemValue)} />
      </View>

     {/* Checkbox for Privacy Policy */}
     <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxText}>
          I have read the{' '}
          <TouchableOpacity
            onPress={() => console.log('Privacy Policy Clicked')}>
            <Text style={styles.privacyPolicyLink}> Privacy Policy</Text>
          </TouchableOpacity>
        </Text>
        <TouchableOpacity
          style={[styles.checkbox, isChecked && styles.checkedBox]}
          onPress={() => setIsChecked(!isChecked)}>
          {isChecked && <Text style={styles.checkmark}>✔</Text>}
        </TouchableOpacity>
      </View>

      <CustomPressable title="SIGN UP" onPress={handleSignUp} />
    </ImageBackground>
  );
}
