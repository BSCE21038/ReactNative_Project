import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import Screens
import HomeScreen from './src/Screens/homeScreen';
import ProfileScreen from './src/Screens/profileScreen';
import NotificationsScreen from './src/Screens/notificationScreen';
import SettingsScreen from './src/Screens/settingsScreen';

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Profile') iconName = 'person';
            else if (route.name === 'Notifications') iconName = 'notifications';
            else if (route.name === 'Settings') iconName = 'settings';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} options={{headerShown: false}}/>
        <Tab.Screen name="Settings" component={SettingsScreen} options={{headerShown: false}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
