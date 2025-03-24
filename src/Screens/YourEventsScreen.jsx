import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const YourEventsScreen = ({ navigation }) => {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const fetchRegisteredEvents = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const registeredKeys = keys.filter(key => key.startsWith('registeredAttendees_'));
      const events = [];
      
      for (const key of registeredKeys) {
        const storedData = await AsyncStorage.getItem(key);
        if (storedData) {
          const attendees = JSON.parse(storedData);
          if (attendees.length > 0) {
            events.push({ id: key.replace('registeredAttendees_', ''), attendees });
          }
        }
      }
      setRegisteredEvents(events);
    } catch (error) {
      console.log('Error fetching registered events:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchRegisteredEvents();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Registered Events</Text>
      {registeredEvents.length === 0 ? (
        <Text style={styles.emptyText}>No registered events</Text>
      ) : (
        <FlatList
          data={registeredEvents}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.eventCard} 
              onPress={() => navigation.navigate('AttendeeDetails', { eventId: item.id, attendees: item.attendees })}>
              <Text style={styles.title}>Event ID: {item.id}</Text>
              <Text style={styles.subText}>{item.attendees.length} Attendee(s) Registered</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
  emptyText: { fontSize: 18, textAlign: 'center', marginTop: 20, color: 'gray' },
  eventCard: { padding: 10, backgroundColor: '#f8f8f8', marginBottom: 10, borderRadius: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  subText: { fontSize: 16, color: 'gray' },
});

export default YourEventsScreen;
