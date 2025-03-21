import React from 'react';
import {Pressable, Text, StyleSheet, View, Image} from 'react-native';

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
    backgroundColor: '#6A5ACD',
    borderColor: '#6A5ACD',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 2,
    width: '80%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressedButton: {
    backgroundColor: '#0056b3',
  },
  icon: {
    width: 25,
    height: 30,
    marginRight: 40,
    marginLeft: -40,
    resizeMode: 'contain',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomPressable;
