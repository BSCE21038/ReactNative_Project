import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

// reusable text input
const CustomTextInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  isPassword,
  keyboardType,
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry); // State to control password visibility

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={isPassword ? isSecure : false} // Hides text if it's a password input
        style={styles.input}
        placeholderTextColor="black"
        borderColor="black"
        keyboardType={keyboardType}
      />
      {isPassword && (
        <TouchableOpacity
          onPress={() => setIsSecure(!isSecure)}
          style={styles.eyeButton}>
          <Image
            source={require('../../assets/eye.png')}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    height: 45,
    flex: 1,
    color: 'black',
  },
  eyeButton: {
    padding: 10,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default CustomTextInput;
