import React from 'react';
import {Pressable, Text, StyleSheet, View, Image} from 'react-native';

// reusable button 
const CustomPressable = ({title, onPress, style, textStyle, icon}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        pressed && styles.pressedButton,
        style,
      ]}>
      <View style={styles.content}>
        {icon && <Image source={icon} style={styles.icon} />}
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    borderColor: 'black',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 2,
    width: '90%',
    alignSelf:"center",
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressedButton: {
    backgroundColor: "white",
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 15,
    resizeMode: 'contain',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomPressable;
