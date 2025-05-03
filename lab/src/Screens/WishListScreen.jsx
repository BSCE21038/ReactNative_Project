import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api, { HOST } from '../api';

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

  const removeFromWishlist = async (id) => {
    try {
      const updatedWishlist = wishlist.filter((item) => item.id !== id);
      setWishlist(updatedWishlist);
      await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    } catch (error) {
      console.log('Error removing item from wishlist:', error);
    }
  };

  const confirmRemove = (id) => {
    Alert.alert(
      'Remove from Wishlist',
      'Are you sure you want to remove this event?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', onPress: () => removeFromWishlist(id), style: 'destructive' },
      ]
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchWishlist();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.eventCard}>
      <Image source={{ uri: `${HOST}${item.imageUrl}` }} style={styles.image} />
      <View style={styles.row}>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => confirmRemove(item.id)}
        >
          <Icon name="trash-can-outline" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/Mask.png')}
      style={styles.container}
    >
      <Text style={styles.header}>Wishlist</Text>
      {wishlist.length === 0 ? (
        <Text style={styles.emptyText}>No saved events</Text>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
  emptyText: { fontSize: 18, textAlign: 'center', marginTop: 20, color: 'gray' },
  eventCard: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
    borderRadius: 10,
  },
  image: { width: '100%', height: 150, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold', flex: 1 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  removeButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: 'rgba(255,0,0,0.05)',
  },
});

export default WishlistScreen;
