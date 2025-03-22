import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles';
import CustomPressable from '../Components/CustomPressable';
import CustomTextInput from '../Components/CustomTextInput';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SignInScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigateToSignUp = useCallback(() => navigation.navigate("SignUp"), [navigation]);

  return (
    <ImageBackground
      source={require('../../assets/Mask.png')}
      style={styles.container}>
      {/* Back Button */}
      <Icon
        name="arrow-back"
        size={30}
        color="#6A5ACD"
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      />

      {/* new-Added Logo at the Top*/}
      <Image source={require("../../assets/logo.png")} style={styles.logo1} />
      <Text style={styles.mainHeading}>Welcome</Text>

      <CustomPressable
        title="CONTINUE WITH FACEBOOK"
        onPress={() => {}}
        style={styles.socialButton}
        icon={require('../../assets/Vector.png')}
      />
      <CustomPressable
        title="CONTINUE WITH GOOGLE"
        onPress={() => {}}
        style={styles.socialButton}
        icon={require('../../assets/Group6795.png')}
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

      <CustomPressable
        title="LOG IN"
        onPress={() => navigation.navigate('MainApp')}
      />
      <Text
        style={styles.forgotPasswordText}
        onPress={() => console.log('Forgot Password Pressed')}>
        FORGOT PASSWORD?
      </Text>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>DON'T HAVE AN ACCOUNT? </Text>
        <TouchableOpacity onPress={navigateToSignUp}>
          <Text style={styles.loginLink}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
