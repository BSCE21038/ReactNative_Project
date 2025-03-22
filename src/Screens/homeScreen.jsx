import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';

// Dummy categories
const categories = [
  { id: '1', name: 'Art', icon: 'color-palette', color: '#FF6F61' },
  { id: '2', name: 'Music', icon: 'musical-notes', color: '#FFD700' },
  { id: '3', name: 'Food', icon: 'fast-food', color: '#4CAF50' },
  { id: '4', name: 'Concert', icon: 'microphone', color: '#FF4081' },
  { id: '5', name: 'Education', icon: 'school', color: '#03A9F4' },
  { id: '6', name: 'Comedy', icon: 'happy', color: '#FF9800' },
];

// Dummy upcoming events
const upcomingEvents = [
  {
    id: 'event1',
    title: 'Future Fest 2025',
    date: '24 JAN',
    location: 'Expo Center Lahore',
    attendees: '+20 Going',
    image: require('../../assets/event1.png'),
  },
  {
    id: 'event2',
    title: 'NCA Thesis Show',
    date: '10 JUNE',
    location: 'NCA Lahore',
    attendees: '+20 Going',
    image: require('../../assets/event2.jpg'),
  },
  {
    id: 'event3',
    title: 'NCA Thesis Show',
    date: '10 JUNE',
    location: 'NCA Lahore',
    attendees: '+20 Going',
    image: require('../../assets/event3.webp'),
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={[styles.categoryButton, { backgroundColor: item.color }]}>
      <Ionicons name={item.icon} size={22} color="#fff" />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

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
          <TouchableOpacity>
            <FontAwesome name="heart" size={18} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <ImageBackground source={require('../../assets/blockScreen.png')} style={styles.topNav}>
        <Ionicons name="menu" size={28} color="white" onPress={() => navigation.openDrawer()} />
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="gray" />
          <TextInput placeholder="Search..." style={styles.searchInput} />
          <TouchableOpacity>
            <MaterialIcons name="filter-list" size={24} color="#007bff" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <ScrollView>
        {/* Categories */}
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryList}
        />

        {/* Upcoming Events */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={upcomingEvents}
          renderItem={renderEventCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        {/* Invite Friends Section */}
        <TouchableOpacity style={styles.inviteCard}>
          <Text style={styles.inviteText}>Invite your friends</Text>
          <Text style={styles.inviteSubText}>Get a free ticket</Text>
        </TouchableOpacity>

        {/* Nearby Events */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby You</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
