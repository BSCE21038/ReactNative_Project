import React from 'react';
import {View, Text, FlatList, ImageBackground} from 'react-native';
import styles from '../styles';
import CustomCard from '../Components/CustomCard';

const topics = [
  {
    id: '001',
    title: 'Reduce Stress',
    imagePath: require('../../assets/MaskGroup.png'),
    backgroundColor: '#8E97FD',
  },
  {
    id: '002',
    title: 'Improve Performance',
    imagePath: require('../../assets/Frame.png'),
    backgroundColor: '#FA6E5A',
  },
  {
    id: '003',
    title: 'Increase Happiness',
    imagePath: require('../../assets/MaskGroup(1).png'),
    backgroundColor: '#FEB18F',
  },
  {
    id: '004',
    title: 'Reduce Anxiety',
    imagePath: require('../../assets/Group(4).png'),
    backgroundColor: '#FFCF86',
  },
  {
    id: '005',
    title: 'Better Sleep',
    imagePath: require('../../assets/Group(3).png'),
    backgroundColor: '#3F414E',
  },
  {
    id: '006',
    title: 'Personal Growth',
    imagePath: require('../../assets/Group.png'),
    backgroundColor: '#76C79E',
  },
  {
    id: '007',
    title: 'Relaxation',
    imagePath: require('../../assets/Group_1.png'),
    backgroundColor: '#FFC97E',
  },
  {
    id: '008',
    title: 'Personal Growth',
    imagePath: require('../../assets/Group(2).png'),
    backgroundColor: '#D9A5B5',
  },
];

export default function ChooseTopicScreen({navigation}) {
  return (
    <ImageBackground
      source={require('../../assets/chooseTopic.png')}
      style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.heading}>What Brings you</Text>
        <Text style={styles.subHeading}>to Silent Moon?</Text>
        <Text style={styles.listDescription}>choose a topic to focus on:</Text>

        <FlatList
          data={topics}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <CustomCard
              title={item.title}
              imagePath={item.imagePath}
              backgroundColor={item.backgroundColor}
              onPress={() => navigation.navigate('Reminders')}
            />
          )}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </ImageBackground>
  );
}
