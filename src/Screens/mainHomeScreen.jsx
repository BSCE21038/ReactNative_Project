import React from 'react';
import {View, Text, ImageBackground, Image} from 'react-native';
import styles from '../styles';
import CustomPressable from '../Components/CustomPressable';

export default function MainHomeScreen({navigation}) {
  return (
    <ImageBackground
      source={require('../../assets/welcome.png')}
      style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../../assets/Group6813.png')}
        style={styles.logo}
      />

      {/* Floating Shapes */}
      <Image
        source={require('../../assets/Ellipse14.png')}
        style={styles.ellipse14}
      />
      <Image
        source={require('../../assets/Ellipse15.png')}
        style={styles.ellipse15}
      />
      <Image
        source={require('../../assets/bigCloud.png')}
        style={styles.bigCloud}
      />
      <Image
        source={require('../../assets/smallCloud.png')}
        style={styles.smallCloud}
      />
      <Image
        source={require('../../assets/bigBird.png')}
        style={styles.bigBird}
      />
      <Image
        source={require('../../assets/smallBird.png')}
        style={styles.smallBird}
      />

      <Text style={styles.welcomeText}>
        Hi Afsar, <Text style={styles.subTitle}>Welcome</Text>
      </Text>
      <Text style={styles.appName}>to Silent Moon</Text>
      <Text style={styles.description}>
        Explore the app, Find some peace of mind to prepare for meditation.
      </Text>

      {/* Meditation Image and Overlays */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/Group6854.png')}
          style={styles.meditationImage}
        />
        <Image
          source={require('../../assets/Group6856.png')}
          style={styles.bottomOverlay}
        />
        <Image
          source={require('../../assets/Group111.png')}
          style={styles.centerOverlay}
        />
      </View>

      <CustomPressable
        title="Get Started"
        onPress={() => navigation.navigate('ChooseTopic')}
        style={styles.getStartedButton}
        textStyle={{color: '#5B4DA7'}}
      />
    </ImageBackground>
  );
}
