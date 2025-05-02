import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet , ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import api, { HOST } from '../api'

const WishlistScreen = ({ navigation }) => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const savedEvents = await AsyncStorage.getItem('wishlist');
      setWishlist(savedEvents ? JSON.parse(savedEvents) : []);
    } catch (error) {
      console.log('Error fetching wishlist:', error);
    }
  };

  // Use useFocusEffect to refresh wishlist when navigating to this screen
  useFocusEffect(
    React.useCallback(() => {
      fetchWishlist();
    }, [])
  );

  return (
      <ImageBackground
                  source={require('../../assets/Mask.png')}
                  style={styles.container}>
      <Text style={styles.header}>Wishlist</Text>
      {wishlist.length === 0 ? (
        <Text style={styles.emptyText}>No saved events</Text>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.eventCard}>
              <Image 
              source={{ uri: `${HOST}${item.imageUrl}`  }}
              style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
            </View>
          )}
        />
      )}
      </ImageBackground>
    
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
  emptyText: { fontSize: 18, textAlign: 'center', marginTop: 20, color: 'gray' },
  eventCard: { padding: 10, backgroundColor: '#f8f8f8', marginBottom: 10, borderRadius: 10 },
  image: { width: '100%', height: 150, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold', marginTop: 5 },
});

export default WishlistScreen;
