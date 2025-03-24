// firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  getReactNativePersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyD8j_mgxBpX7IxtjIUJ5qXu3eLPVpVN_0M",
  authDomain: "upnext-4697c.firebaseapp.com",
  projectId: "upnext-4697c",
  storageBucket: "upnext-4697c.firebasestorage.app",
  messagingSenderId: "637085183920",
  appId: "1:637085183920:web:ee0203bbfa9931041ef075",
  measurementId: "G-G03CR3F94J",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const initializeAuth = async () => {
  await setPersistence(auth, getReactNativePersistence(AsyncStorage));
};

initializeAuth()
  .then(() => console.log("Firebase Auth Persistence Enabled"))
  .catch((error) =>
    console.error("Firebase Persistence Error:", error)
  );

const subscribeToAuthChanges = (onUserAuthenticated) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log("User authenticated:", user.email);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      onUserAuthenticated(user);
    } else {
      onUserAuthenticated(null);
    }
  });
};

// Replace with your actual Web Client ID from Firebase console.
const WEB_CLIENT_ID =
  "637085183920-9tk68729hqp3vt2h5b8ad6di33ipafdj.apps.googleusercontent.com";

export { auth, WEB_CLIENT_ID, db, subscribeToAuthChanges };
