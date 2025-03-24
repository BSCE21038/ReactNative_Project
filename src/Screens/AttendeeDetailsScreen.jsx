import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const AttendeeDetailsScreen = ({ route }) => {
  const { eventId, attendees } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Attendees for Event {eventId}</Text>
      <FlatList
        data={attendees}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.attendeeCard}>
            <Text style={styles.name}>Name: {item.name}</Text>
            <Text>Registration Number: {item.registrationNumber}</Text>
            <Text>Contact: {item.contact}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
  attendeeCard: { padding: 10, backgroundColor: '#f8f8f8', marginBottom: 10, borderRadius: 10 },
  name: { fontSize: 18, fontWeight: 'bold' },
});

export default AttendeeDetailsScreen;
