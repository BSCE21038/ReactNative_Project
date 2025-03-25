import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const OrganizerHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Organizer Dashboard</Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate("CreateEvent")}
      >
        <Text style={styles.buttonText}>Create New Event</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate("ManageEvents")}
      >
        <Text style={styles.buttonText}>Manage My Events</Text>
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
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OrganizerHome;
