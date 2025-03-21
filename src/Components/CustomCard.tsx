import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const CustomCard = ({title, subtext, imagePath, backgroundColor, onPress}) => {
  return (
    <View style={[styles.card, {backgroundColor}]}>
      <Image source={imagePath} style={styles.image} />
      <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
        {title}
      </Text>
      {subtext ? <Text style={styles.subtext}>{subtext}</Text> : null}
      <TouchableOpacity style={styles.startButton} onPress={onPress}>
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 5,
    width: 160,
    height: 180,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  subtext: {
    fontSize: 12,
    color: 'white',
    marginTop: 5,
  },
  startButton: {
    marginTop: 10,
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CustomCard;
