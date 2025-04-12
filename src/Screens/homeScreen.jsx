import React, {useState, useEffect} from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';

// Updated categories with "All"
const categories = [
  {id: '0', name: 'All', icon: 'apps', color: '#333333'},
  {id: '1', name: 'Art', icon: 'color-palette', color: '#FF6F61'},
  {id: '2', name: 'Music', icon: 'musical-notes', color: '#FFD700'},
  {id: '3', name: 'Food', icon: 'fast-food', color: '#4CAF50'},
  {id: '4', name: 'Concert', icon: 'mic', color: '#FF4081'},
  {id: '5', name: 'Education', icon: 'school', color: '#03A9F4'},
  {id: '6', name: 'Comedy', icon: 'happy', color: '#FF9800'},
];

// Dummy all events
const allEvents = [
  {
    id: 'event1',
    title: 'Future Fest 2025',
    date: '2025-01-24',
    category: 'Tech',
    city: 'Lahore',
    location: 'Expo Center, Lahore',
    attendees: '+20 Going',
    description: `Future Fest 2025 is the largest tech and innovation event in Pakistan, bringing together visionaries from over 50 countries.  

Location: Expo Center, Lahore  
Dates: January 24 – 26, 2025  

Why Attend?  
- Experience cutting-edge technology and revolutionary ideas.  
- Connect with global tech leaders, investors, and entrepreneurs.  
- Explore the latest innovations in AI, startups, and digital transformation.  

Supported by industry giants such as Hashoo Group, Graana, EasyPaisa, and Google Cloud, Future Fest has generated over $200M in investments and created 30,000+ jobs.  

Mark your calendars and be part of the movement!`,
    image: require('../../assets/event1.png'),
  },
  {
    id: 'event2',
    title: 'Ramazaar - Chaand Raat',
    date: '2025-05-30',
    category: 'Food',
    city: 'Lahore',
    location: 'Model Town Community Center, Lahore',
    attendees: '+30 Going',
    description: `Ramazaar returns this Chaand Raat for a night filled with shopping, food, and entertainment!  

Location: Model Town Community Center, Lahore  
Dates: April 30 – 31, 2025  
Timings: 6:00 PM – Sehri  

Event Highlights:  
- Food stalls featuring a variety of cuisines.  
- Shopping booths with Eid essentials and trendy fashion.  
- Gaming zone with fun activities for all ages.  
- Art workshop by Mashghalay.  
- Mehndi stalls for the perfect Eid look.  

Join us for a festive celebration like never before!`,
    image: require('../../assets/event2.jpg'),
  },
  {
    id: 'event3',
    title: 'Mashion Bazaar: Chaand Raat',
    date: '2025-04-18',
    category: 'Art',
    city: 'Lahore',
    location: 'Lahore Polo Club',
    attendees: '+50 Going',
    description: `Mashion Bazaar returns with a grand Chaand Raat celebration, blending fashion, food, and entertainment in a vibrant atmosphere.  

Location: Lahore Polo Club  
Dates: April 18 – 29, 2025  
Timings: 5:00 PM – 12:00 AM  

What’s in Store?  
- 150+ vendors featuring fashion, beauty, and home décor brands.  
- Beauty activations for makeup and skincare enthusiasts.  
- Interactive workshops, including bouquet making and creative activities.  
- Kids and adult zones with games and entertainment.  
- Photo booths to capture your festival moments.  
- Food stalls offering delicious festival treats.  

Ticket Details:  
- Both Days (28th & 29th): Rs. 1,400  
- Single Day (28th or 29th): Rs. 750  
- Student Discount: Rs. 650 per day  

Note: Families only – No stags allowed.  

Shop, eat, and celebrate at Mashion Bazaar! Mark your calendars for an unforgettable experience.`,
    image: require('../../assets/event3.webp'),
  },
];

// function to filter upcoming events within 15 days
const filterUpcomingEvents = () => {
  const today = new Date();
  const fifteenDaysLater = new Date();
  fifteenDaysLater.setDate(today.getDate() + 15);

  return allEvents.filter(event => {
    const eventDate = new Date(event.date); //convert string dates to Date
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

  // Function to filter events by category
  const filterByCategory = category => {
    setSelectedCategory(category);

    if (category === 'All') {
      setFilteredEvents(allEvents);
      setUpcomingEvents(filterUpcomingEvents()); // Restore upcoming events when viewing all
    } else {
      setFilteredEvents(allEvents.filter(event => event.category === category));
      setUpcomingEvents([]); // Hide upcoming events
    }
  };

  // Function to filter events based on search & filters
  const filterEvents = query => {
    setSearchQuery(query);

    if (query.trim() === '') {
      // If search bar is empty, restore to category view
      filterByCategory(selectedCategory);
    } else {
      //show matching title
      const filtered = allEvents.filter(event =>
        event.title.toLowerCase().includes(query.toLowerCase()),
      );

      setFilteredEvents(filtered);
    }
  };

  // Function to render category buttons
  const renderCategory = ({item}) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        {
          backgroundColor:
            selectedCategory === item.name ? '#007bff' : item.color,
        },
      ]}
      onPress={() => filterByCategory(item.name)}>
      <Ionicons name={item.icon} size={22} color="#fff" />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Function to render event cards
  const renderEventCard = ({item}) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => navigation.navigate('EventDetails', {event: item})} // Send full event object
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
    <View style={styles.container1}>
      {/* Top Navigation Bar */}
      <ImageBackground
        source={require('../../assets/blockScreen.png')}
        style={styles.topNav}>
        {/* <Ionicons name="menu" size={28} color="white" /> */}
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
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false} //scrollable row
          style={styles.categoryList}
        />

        {/* Show Upcoming Events only if 'All' category is selected */}
        {selectedCategory === 'All' &&
          searchQuery.trim() === '' &&
          upcomingEvents.length > 0 && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Upcoming Events</Text>
              </View>
              <FlatList
                data={upcomingEvents}
                renderItem={renderEventCard}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}

        {/* Section heading based on category selected */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All'
              ? 'All Events'
              : `${selectedCategory} Events`}
          </Text>
        </View>
        {/* Show filter events */}
        {filteredEvents.length > 0 ? (
          <FlatList
            data={filteredEvents}
            renderItem={renderEventCard}
            keyExtractor={item => item.id}
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
