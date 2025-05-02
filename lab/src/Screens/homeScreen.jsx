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
import api, {HOST} from '../api'; // wherever you put it
// function to filter upcoming events within 15 days
const ICONS = {
  All: 'apps',
  Art: 'color-palette',
  Music: 'musical-notes',
  Food: 'fast-food',
  Concert: 'mic',
  Education: 'school',
  Comedy: 'happy',
  Tech: 'hardware-chip',
};
const COLORS = {
  All: '#333',
  Art: '#FF6F61',
  Music: '#FFD700',
  Food: '#4CAF50',
  Concert: '#FF4081',
  Education: '#03A9F4',
  Comedy: '#FF9800',
  Tech: '#888',
};

const HomeScreen = () => {
  const navigation = useNavigation();

  // State Variables
  // const [filteredEvents, setFilteredEvents] = useState(allEvents); // Display all events initially
  // const [upcomingEvents, setUpcomingEvents] = useState(filterUpcomingEvents());
  // const [selectedCategory, setSelectedCategory] = useState('All');
  // const [searchQuery, setSearchQuery] = useState('');

  const [categories, setCategories] = useState([]);
  const [allEvents, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // load categories once
    api
      .get('/categories')
      .then(res => setCategories([{id: 0, name: 'All'}, ...res.data]))

      .catch(console.error);

    // load all events once
    api
      .get('/events')
      .then(res => {
        // console.log('🎉 events from API:', res.data);
        setEvents(res.data);
        setFilteredEvents(res.data);
      })
      .catch(console.error);
    //  console.error('🔥 failed to load events:', console.error);
  }, []);

  const upcomingEvents = allEvents.filter(event => {
    const today = new Date();
    const in15 = new Date();
    in15.setDate(today.getDate() + 15);
    const eventDate = new Date(event.date);
    return eventDate >= today && eventDate <= in15;
  });

  // Function to filter events by category
  const filterByCategory = category => {
    setSelectedCategory(category);
    const url =
      category === 'All'
        ? '/events'
        : `/events?category=${encodeURIComponent(category)}`;

    api
      .get(url)
      .then(res => setFilteredEvents(res.data))
      .catch(console.error);
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
            selectedCategory === item.name
              ? '#007bff'
              : COLORS[item.name] || '#666',
        },
      ]}
      onPress={() => filterByCategory(item.name)}>
      <Ionicons name={ICONS[item.name]} size={22} color="#fff" />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Function to render event cards
  const renderEventCard = ({item}) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => navigation.navigate('EventDetails', {event: item})} // Send full event object
    >
      <Image
        source={{uri: `${HOST}${item.imageUrl}`}}
        style={styles.eventImage}
        resizeMode="cover"
      />
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
        <ImageBackground
      source={require('../../assets/Mask.png')}
      style={styles.container}>
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
            keyExtractor={item => item.id.toString()}
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
                  keyExtractor={item => item.id.toString()}
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
              keyExtractor={item => item.id}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                paddingHorizontal: 5,
                paddingVertical: 8,
              }}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[styles.eventCard]}
                  onPress={() =>
                    navigation.navigate('EventDetails', {event: item})
                  }>
                  <Image
                    source={{uri: `${HOST}${item.imageUrl}`}}
                    style={styles.eventImage}
                    resizeMode="cover"
                  />
                  <View style={styles.eventInfo}>
                    <Text style={styles.eventDate}>{item.date}</Text>
                    <Text style={styles.eventTitle}>{item.title}</Text>
                    <Text style={styles.eventLocation}>{item.location}</Text>
                    <View style={styles.eventFooter}>
                      <FontAwesome name="users" size={16} color="#007bff" />
                      <Text style={styles.eventAttendees}>
                        {item.attendees}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No results found</Text>
            </View>
          )}
        </ScrollView>
        </ImageBackground>
      </View>
  );
};

export default HomeScreen;
