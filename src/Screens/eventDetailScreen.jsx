import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
  Dimensions,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EventDetailScreen = ({navigation}) => {
  const route = useRoute();
  const {event} = route.params;

  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);

  //function to save/unsave in wishlist
  const toggleSave = async () => {
    try {
      const existingEvents = await AsyncStorage.getItem('wishlist');
      let wishlist = existingEvents ? JSON.parse(existingEvents) : []; //parse the save events

      // Check if the event is already saved
      const eventExists = wishlist.some(e => e.id === event.id);

      if (eventExists) {
        // Remove event from wishlist
        wishlist = wishlist.filter(e => e.id !== event.id);
        setSaved(false);
      } else {
        // Add event to wishlist
        wishlist.push(event);
        setSaved(true);
      }

      await AsyncStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.log('Error updating wishlist:', error);
    }
  };

  // share event details using device's share sheet
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this event: ${event.title} at ${event.location} on ${event.date}`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Event not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Icon
        name="arrow-back"
        size={30}
        color="#6A5ACD"
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      />
      {/* Sticky Event Image */}
      <View style={styles.stickyImageContainer}>
        <Image source={event.image} style={styles.eventImage} />
        <TouchableOpacity style={styles.saveButton} onPress={toggleSave}>
          <Icon
            name={saved ? 'bookmark' : 'bookmark-border'}
            size={28}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{event.title}</Text>

          <View style={styles.organizerRow}>
            <View style={styles.organizerInfo}>
              <Icon name="event" size={20} color="#FF6F61" />
              <Text style={styles.organizerText}>{event.category} Event</Text>
            </View>
            {/* <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity> */}
          </View>

          <View style={styles.detailsRow}>
            <Icon name="calendar-today" size={20} color="#FF6F61" />
            <Text style={styles.detailText}>{event.date}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Icon name="location-on" size={20} color="#FF6F61" />
            <Text style={styles.detailText}>{event.location}</Text>
          </View>

          <View style={styles.attendeesRow}>
            <Icon name="group" size={20} color="#007bff" />
            <Text style={styles.attendeesText}>{event.attendees}</Text>
          </View>

          <Text style={styles.description}>
            {expanded
              ? event.description
              : `${event.description.substring(0, 180)}...`}
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
              <Text style={styles.readMoreText}>
                {expanded ? 'Read Less' : 'Read More'}
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('Registration', {event})}>
          <Text style={styles.registerText}>Register Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Icon name="share" size={24} color="#FF6F61" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    color: 'black',
    zIndex: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 30,
    padding: 8,
  },
  stickyImageContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 280,
    zIndex: 10,
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  saveButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 20,
  },
  scrollContent: {
    paddingTop: 280,
  },
  contentContainer: {
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  organizerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  organizerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  organizerText: {
    fontSize: 16,
    marginLeft: 5,
  },
  followButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  followText: {
    color: '#fff',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 5,
  },
  attendeesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  attendeesText: {
    fontSize: 16,
    marginLeft: 5,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
    color: '#333',
    marginVertical: 10,
  },
  readMoreText: {
    color: '#007bff',
    fontWeight: 'bold',
    marginTop: 5,
  },
  bottomButtons: {
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
  },
  registerButton: {
    backgroundColor: '#FF6F61',
    padding: 12,
    flex: 1,
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 10,
  },
  registerText: {
    color: '#fff',
    fontSize: 18,
  },
  shareButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF6F61',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default EventDetailScreen;
