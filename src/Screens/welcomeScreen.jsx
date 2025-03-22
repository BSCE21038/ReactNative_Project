import React, {useCallback} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles';
import CustomPressable from '../Components/CustomPressable';
import {useNavigation} from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const navigateToSignUp = useCallback(
    () => navigation.navigate('SignUp'),
    [navigation],
  );
  const navigateToSignIn = useCallback(
    () => navigation.navigate('SignIn'),
    [navigation],
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('SignIn')}>
      <Image
        source={require('../../assets/welcome_bg.png')}
        style={styles.firstScreen}
      />
    </TouchableOpacity>
  );
}
