import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import Screens
import HomeScreen from '../Screens/homeScreen';
import ProfileScreen from '../Screens/profileScreen';
import YourEventScreen from '../Screens/YourEventsScreen';
import WishlistScreen from '../Screens/WishListScreen';

// Create a bottom tab navigator instance
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Profile') iconName = 'person';
          else if (route.name === 'Events') iconName = 'calendar';
          else if (route.name === 'Wishlist') iconName = 'heart';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#DC143C',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Events" component={YourEventScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
