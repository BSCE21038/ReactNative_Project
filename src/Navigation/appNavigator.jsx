import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

// Import Screens
import WelcomeScreen from "../Screens/welcomeScreen";
import SignInScreen from "../Screens/signInScreen";
import SignUpScreen from "../Screens/signUpScreen";
import MainTabNavigator from "./mainTabNavigator"; // Attendee Screens
import OrganizerHome from "../Screens/organizerHome"; // Organizer Screens
import EventDetailScreen from "../Screens/eventDetailScreen";
import RegistrationScreen from "../Screens/RegistrationsScreen";
import WishlistScreen from "../Screens/WishListScreen";
import YourEventsScreen from "../Screens/YourEventsScreen";
import AttendeeDetailsScreen from "../Screens/AttendeeDetailsScreen";
import CreateEventScreen from "../Screens/createEventScreen"; 
import ManageEventsScreen from "../Screens/manageEventScreen"; 

// Create a stack navigator instance
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState("Welcome"); // State to set the initial screen
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) { // If user is logged in.
        const userDoc = await getDoc(doc(db, "users", user.uid)); // Fetch user role from Firestore
        if (userDoc.exists()) { // Check if user data exists
          const userRole = userDoc.data().role; // Extract the role
          setInitialRoute(userRole === "organizer" ? "OrganizerHome" : "MainApp"); // Navigate based on role
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return null; // Prevents flickering

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
        {/* Common Screens */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />

        {/* Attendee Screens */}
        <Stack.Screen name="MainApp" component={MainTabNavigator} />
        <Stack.Screen name="EventDetails" component={EventDetailScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Wishlist" component={WishlistScreen} />
        <Stack.Screen name="YourEvents" component={YourEventsScreen} />
        <Stack.Screen name="AttendeeDetails" component={AttendeeDetailsScreen} />

        {/* Organizer Screens */}
        <Stack.Screen name="OrganizerHome" component={OrganizerHome} />
        <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
        <Stack.Screen name="ManageEvents" component={ManageEventsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
