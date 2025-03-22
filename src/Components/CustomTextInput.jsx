import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

const CustomTextInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  isPassword,
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={isPassword ? isSecure : false}
        style={styles.input}
        placeholderTextColor="gray"
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
    borderColor: '#ccc',
    borderRadius: 20,
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
