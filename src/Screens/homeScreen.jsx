import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';

// Updated categories with "All"
const categories = [
  { id: '0', name: 'All', icon: 'apps', color: '#333333' }, // "All" category added
  { id: '1', name: 'Art', icon: 'color-palette', color: '#FF6F61' },
  { id: '2', name: 'Music', icon: 'musical-notes', color: '#FFD700' },
  { id: '3', name: 'Food', icon: 'fast-food', color: '#4CAF50' },
  { id: '4', name: 'Concert', icon: 'microphone', color: '#FF4081' },
  { id: '5', name: 'Education', icon: 'school', color: '#03A9F4' },
  { id: '6', name: 'Comedy', icon: 'happy', color: '#FF9800' },
];

// Dummy all events
const allEvents = [
  {
    id: 'event1',
    title: 'Future Fest 2025',
    date: '2025-01-24',
    category: 'Tech',
    city: 'Lahore',
    location: 'Expo Center Lahore',
    attendees: '+20 Going',
    image: require('../../assets/event1.png'),
  },
  {
    id: 'event2',
    title: 'NCA Thesis Show',
    date: '2025-04-10',
    category: 'Art',
    city: 'Lahore',
    location: 'NCA Lahore',
    attendees: '+30 Going',
    image: require('../../assets/event2.jpg'),
  },
  {
    id: 'event3',
    title: 'Food Festival',
    date: '2025-03-28',
    category: 'Food',
    city: 'Islamabad',
    location: 'Centaurus Mall',
    attendees: '+50 Going',
    image: require('../../assets/event3.webp'),
  },
];

// Helper function to filter upcoming events within 15 days
const filterUpcomingEvents = () => {
  const today = new Date();
  const fifteenDaysLater = new Date();
  fifteenDaysLater.setDate(today.getDate() + 15);

  return allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate >= today && eventDate <= fifteenDaysLater;
  });
};

const HomeScreen = () => {
  const navigation = useNavigation();

  // State Variables
  const [filteredEvents, setFilteredEvents] = useState(allEvents); // Display all events initially
  const [upcomingEvents, setUpcomingEvents] = useState(filterUpcomingEvents());
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Function to filter events by category
  const filterByCategory = (category) => {
    setSelectedCategory(category);

    if (category === 'All') {
      setFilteredEvents(allEvents);
      setUpcomingEvents(filterUpcomingEvents()); // Restore upcoming events when viewing all
    } else {
      setFilteredEvents(allEvents.filter((event) => event.category === category));
      setUpcomingEvents([]); // Hide upcoming events for category-specific views
    }
  };

  // Function to filter events based on search & filters
// Function to filter events based on search & filters
const filterEvents = (query) => {
  setSearchQuery(query);

  if (query.trim() === '') {
    // If search bar is empty, restore original category-based filtering
    filterByCategory(selectedCategory);
  } else {
    // Search in all events, ignoring categories
    const filtered = allEvents.filter((event) =>
      event.title.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredEvents(filtered);
    // setUpcomingEvents([]); // Hide upcoming events during search
  }
};

  // Function to render category buttons
  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        { backgroundColor: selectedCategory === item.name ? '#007bff' : item.color },
      ]}
      onPress={() => filterByCategory(item.name)}
    >
      <Ionicons name={item.icon} size={22} color="#fff" />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Function to render event cards
  const renderEventCard = ({ item }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
    >
      <Image source={item.image} style={styles.eventImage} />
      <View style={styles.eventInfo}>
        <Text style={styles.eventDate}>{item.date}</Text>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventLocation}>{item.location}</Text>
        <View style={styles.eventFooter}>
          <FontAwesome name="users" size={16} color="#007bff" />
          <Text style={styles.eventAttendees}>{item.attendees}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <ImageBackground source={require('../../assets/blockScreen.png')} style={styles.topNav}>
        <Ionicons name="menu" size={28} color="white" />
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="gray" />
          <TextInput
  placeholder="Search..."
  style={styles.searchInput}
  value={searchQuery}
  onChangeText={filterEvents} // Call function directly
/>


          {/* <TouchableOpacity onPress={filterEvents}>
            <MaterialIcons name="filter-list" size={24} color="#007bff" />
          </TouchableOpacity> */}
        </View>
      </ImageBackground>

      <ScrollView>
        {/* Category Filters */}
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryList}
        />

        {/* Show Upcoming Events only if 'All' category is selected */}
        {selectedCategory === 'All' && searchQuery.trim() === '' && upcomingEvents.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Events</Text>
            </View>
            <FlatList
              data={upcomingEvents}
              renderItem={renderEventCard}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </>
        )}

        {/* Filtered Events */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All' ? 'All Events' : `${selectedCategory} Events`}
          </Text>
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
    <Text style={styles.noResultsText}>No results found</Text>
  </View>
)}

      </ScrollView>
    </View>
  );
};

export default HomeScreen;
