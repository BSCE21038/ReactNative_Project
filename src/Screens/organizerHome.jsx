import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import CustomPressable from '../Components/CustomPressable';
import CustomTextInput from '../Components/CustomTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import styles from '../styles';

// Dummy Events Created by Organizer
const organizerEvents = [
  {
    id: 'event1',
    title: 'Tech Expo 2025',
    date: '2025-04-10',
    location: 'Expo Center, New York',
    attendees: '150+ Registered',
    image: require('../../assets/event1.png'),
  },
  {
    id: 'event2',
    title: 'Startup Pitch Night',
    date: '2025-05-20',
    location: 'Silicon Valley HQ',
    attendees: '80+ Registered',
    image: require('../../assets/event2.jpg'),
  },
];

const OrganizerHome = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  // Function to filter organizer's events based on search input
  const filterEvents = query => {
    setSearchQuery(query);
  };

  const filteredEvents = organizerEvents.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Function to render event cards
  const renderEventCard = ({item}) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => navigation.navigate('ManageEvents')}>
      <Image source={item.image} style={styles.eventImage} />
      <View style={styles.eventInfo}>
        <Text style={styles.eventDate}>{item.date}</Text>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventLocation}>{item.location}</Text>
        <View style={styles.eventFooter}>
          <Ionicons name="people" size={16} color="#007bff" />
          <Text style={styles.eventAttendees}>{item.attendees}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container1}>
      {/* Top Navigation Bar */}
      <ImageBackground
        source={require('../../assets/blockScreen.png')}
        style={styles.topNav}>
        {/* <Ionicons name="menu" size={28} color="white" /> */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="gray" />
          <TextInput
            placeholder="Search events..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={filterEvents}
          />
        </View>
      </ImageBackground>

      <ScrollView>
        {/* Organizer's Events Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Created Events</Text>
        </View>
        {filteredEvents.length > 0 ? (
          <FlatList
            data={filteredEvents}
            renderItem={renderEventCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No events found</Text>
          </View>
        )}
        {/* Organizer Dashboard Buttons */}
        <View style={styles.dashboardActions}>
          <View style={styles.centeredRow}>
            <CustomPressable
              title="Create Event"
              onPress={() => navigation.navigate('CreateEvent')}>
              <Ionicons name="add-circle" size={24} color="white" />
            </CustomPressable>

            <CustomPressable
              title="Manage Event"
              onPress={() => navigation.navigate('ManageEvents')}>
              <Ionicons name="calendar" size={24} color="white" />
            </CustomPressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrganizerHome;
