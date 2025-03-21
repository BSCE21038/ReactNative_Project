import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import WelcomeScreen from '../Screens/welcomeScreen';
import SignInScreen from '../Screens/signInScreen';
import SignUpScreen from '../Screens/signUpScreen';
import MainHomeScreen from '../Screens/mainHomeScreen';
import HomeScreen from '../Screens/homeScreen';
import ChooseTopicScreen from '../Screens/chooseTopicScreen';
import RemindersScreen from '../Screens/reminderScreen';
import CourseDetailsScreen from '../Screens/courseDetailsScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="MainHome" component={MainHomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ChooseTopic" component={ChooseTopicScreen} />
        <Stack.Screen name="Reminders" component={RemindersScreen} />
        <Stack.Screen name="CourseDetails" component={CourseDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
