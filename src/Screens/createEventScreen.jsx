import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { db, auth } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const CreateEventScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateEvent = async () => {
    if (!title || !location || !date || !category || !description) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "events"), {
        title,
        location,
        date,
        category,
        description,
        createdBy: auth.currentUser.uid,
      });

      Alert.alert("Success", "Event created successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Event</Text>
      
      <TextInput style={styles.input} placeholder="Event Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />
      <TextInput style={styles.input} placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} />
      <TextInput style={styles.input} placeholder="Category" value={category} onChangeText={setCategory} />
      <TextInput 
        style={[styles.input, styles.description]} 
        placeholder="Description" 
        value={description} 
        onChangeText={setDescription} 
        multiline 
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateEvent}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    height: 80,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CreateEventScreen;
