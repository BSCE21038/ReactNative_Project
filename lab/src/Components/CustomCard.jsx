import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const CustomCard = ({
  title,
  subtext,
  imagePath,
  backgroundColor,
  onPress,
  isAlternatingSize = false,
  index,
}) => {
  const {width} = Dimensions.get('window');
  const baseWidth = (width - 40) / 2; // Fixed width for two-column grid
  const isBig = isAlternatingSize && (index % 4 === 0 || index % 4 === 3); // Pattern: 0 (big), 1 (small), 2 (small), 3 (big)
  const cardHeight = isBig ? 200 : 170; // Alternating height
  const imageSize = isBig ? 120 : 100; // Alternating image size
  const textSize = 18;

  // Determine if the card above in the same column is small (to adjust marginTop)
  const column = index % 2; // 0 for left column, 1 for right column
  const row = Math.floor(index / 2); // Row number (0, 1, 2, ...)
  const aboveIndex = (row - 1) * 2 + column; // Index of the card directly above in the same column
  const isAboveSmall =
    row > 0 && !(aboveIndex % 2 === 0 || aboveIndex % 4 === 3); // Check if the card above is small
  const adjustedMarginTop = isBig && isAboveSmall ? -30 : 0; // Move big card up if the card above is small

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor,
          width: baseWidth,
          height: cardHeight,
          marginTop: adjustedMarginTop,
        },
      ]}>
      <Image
        source={imagePath}
        style={[styles.image, {width: imageSize, height: imageSize}]}
      />
      <Text
        style={[styles.text, {fontSize: textSize}]}
        numberOfLines={2}
        ellipsizeMode="tail">
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
    height: 180, // Default height, overridden by dynamic logic
  },
  image: {
    width: 80,
    height: 80,
    // marginBottom: 10,
    resizeMode: 'contain',
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
    // marginTop: 2,
  },
  startButton: {
    // marginTop: 2,
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