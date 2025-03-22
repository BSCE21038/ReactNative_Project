import React from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import styles from '../styles';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import CustomCard from '../Components/CustomCard'; 

const meditationCategories = [
  {
    id: '001',
    title: 'Basics Course',
    imagePath: require('../../assets/Group_3.png'),
    backgroundColor: '#8E97FD',
  },
  {
    id: '002',
    title: 'Relaxation Music',
    imagePath: require('../../assets/Group_1.png'),
    backgroundColor: '#FFC97E',
  },
];

const recommendedSessions = [
  {
    id: '003',
    title: 'Focus',
    subtext: 'MEDITATION . 3-10 MIN',
    imagePath: require('../../assets/Group6895.png'),
    backgroundColor: '#76C79E',
  },
  {
    id: '004',
    title: 'Happiness',
    subtext: 'MEDITATION . 3-10 MIN',
    imagePath: require('../../assets/MaskGroup.png'),
    backgroundColor: '#808AFF',
  },
];

// Greeting based on time
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning, Afsar';
  if (hour < 18) return 'Good Afternoon, Afsar';
  return 'Good Evening, Afsar';
};

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{getGreeting()}</Text>
      <Text style={styles.listDescription}>We Wish you have a good day</Text>
      <FlatList
        data={meditationCategories}
        horizontal
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CustomCard {...item}
            backgroundColor={item.backgroundColor}
            onPress={() => navigation.navigate('CourseDetails')}
          />
        )}
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.dailyThought}>
        <Image
          source={require('../../assets/Group6915.png')}
          style={styles.dailyImage}
        />
        <Text style={styles.dailyTitle}>Daily Thought</Text>
        <Text style={styles.dailySubtext}>MEDITATION . 3-10 MIN</Text>
        <Image
          source={require('../../assets/Group60.png')}
          style={styles.playIcon}
        />
      </View>
      <Text style={styles.subHeading}>Recommended for you</Text>
      <FlatList
        data={recommendedSessions}
        horizontal
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CustomCard
            title={item.title}
            subtext={item.subtext}
            imagePath={item.imagePath}
            backgroundColor={item.backgroundColor}
            onPress={() => navigation.navigate('CourseDetails')}
          />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

// Bottom Navigation Tabs
const Tab = createBottomTabNavigator();

const MainAppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Sleep') {
            iconName = 'bed';
          } else if (route.name === 'Meditate') {
            iconName = 'leaf';
          } else if (route.name === 'Music') {
            iconName = 'musical-notes';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6A5ACD',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Sleep" component={() => <Text>Sleep</Text>} />
      <Tab.Screen name="Meditate" component={() => <Text>Meditate</Text>} />
      <Tab.Screen name="Music" component={() => <Text>Music</Text>} />
      <Tab.Screen name="Profile" component={() => <Text>Profile</Text>} />
    </Tab.Navigator>
  );
};

export default MainAppNavigator;
