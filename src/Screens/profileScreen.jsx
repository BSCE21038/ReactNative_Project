import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "react-native-image-picker";
import Geolocation from "react-native-geolocation-service";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";

const ProfileScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadProfileData();
  }, []);

  // Load Profile Data from AsyncStorage
  const loadProfileData = async () => {
    try {
      const storedImage = await AsyncStorage.getItem("profileImage");
      const storedName = await AsyncStorage.getItem("displayName");
      const storedBio = await AsyncStorage.getItem("bio");
      const storedAddress = await AsyncStorage.getItem("address");

      if (storedImage) setProfileImage(storedImage);
      if (storedName) setDisplayName(storedName);
      if (storedBio) setBio(storedBio);
      if (storedAddress) setAddress(storedAddress);
    } catch (error) {
      console.error("Error loading profile data:", error);
    }
  };

  // Save Profile Data to AsyncStorage
  const saveProfileData = async () => {
    try {
      await AsyncStorage.setItem("displayName", displayName);
      await AsyncStorage.setItem("bio", bio);
      await AsyncStorage.setItem("address", address);
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };

  // Image Picker Functionality
  const pickImage = (type) => {
    const options = {
      mediaType: "photo",
      quality: 1,
      saveToPhotos: true,
    };

    const callback = async (response) => {
      if (response.didCancel) return;
      if (response.errorMessage) {
        Alert.alert("Error", response.errorMessage);
        return;
      }

      const uri = response.assets?.[0]?.uri;
      if (uri) {
        setProfileImage(uri);
        await AsyncStorage.setItem("profileImage", uri);
      }
    };

    if (type === "camera") {
      ImagePicker.launchCamera(options, callback);
    } else {
      ImagePicker.launchImageLibrary(options, callback);
    }
    setModalVisible(false);
  };

  // Fetch Address from Coordinates
  const fetchAddress = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const formattedAddress = response.data.display_name;
      setAddress(formattedAddress);
      await AsyncStorage.setItem("address", formattedAddress);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  // Get Current Location
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        fetchAddress(latitude, longitude);
      },
      (error) => {
        console.error(error);
        Alert.alert("Error", "Unable to fetch location.");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <View style={styles.container}>
      {/* Profile Image Section */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          source={profileImage ? { uri: profileImage } : require("../../assets/placeholder.png")}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      {/* Name & Bio */}
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={displayName}
        onChangeText={setDisplayName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Bio"
        value={bio}
        onChangeText={setBio}
      />

      {/* Address Section */}
      <View style={styles.addressContainer}>
        <TouchableOpacity onPress={getCurrentLocation}>
          <Text style={styles.addressText}>
            {address || "Set Location"} 📍
          </Text>
        </TouchableOpacity>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={saveProfileData}>
        <Text style={styles.saveButtonText}>SAVE</Text>
      </TouchableOpacity>

      {/* Image Picker Modal */}
      <Modal visible={modalVisible} transparent>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalButton} onPress={() => pickImage("camera")}>
            <Text>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={() => pickImage("gallery")}>
            <Text>Choose from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  addressText: {
    fontSize: 16,
    color: "blue",
  },
  saveButton: {
    backgroundColor: "#6C63FF",
    width: "100%",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalButton: {
    backgroundColor: "#fff",
    padding: 15,
    width: 200,
    alignItems: "center",
    marginVertical: 5,
    borderRadius: 10,
  },
  modalCancel: {
    backgroundColor: "red",
    padding: 15,
    width: 200,
    alignItems: "center",
    marginTop: 10,
    borderRadius: 10,
  },
});

export default ProfileScreen;
