import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

// Import Screens
import WelcomeScreen from '../Screens/welcomeScreen';
import SignInScreen from '../Screens/signInScreen';
import SignUpScreen from '../Screens/signUpScreen';
import MainTabNavigator from './mainTabNavigator'; 
import EventDetailScreen from '../Screens/eventDetailScreen';
import RegistrationScreen from '../Screens/RegistrationsScreen';
import WishlistScreen from '../Screens/WishListScreen';
import YourEventsScreen from '../Screens/YourEventsScreen'; 
import AttendeeDetailsScreen from '../Screens/AttendeeDetailsScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="MainApp" component={MainTabNavigator} />
        <Stack.Screen name="EventDetails" component={EventDetailScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Wishlist" component={WishlistScreen} />
        <Stack.Screen name="YourEvents" component={YourEventsScreen} />
        <Stack.Screen name="AttendeeDetails" component={AttendeeDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
