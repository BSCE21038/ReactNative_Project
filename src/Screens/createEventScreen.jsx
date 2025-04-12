import React, {useState} from 'react';
import {View, Text, TextInput, Alert, StyleSheet, Image} from 'react-native';
import {db, auth} from '../../firebaseConfig';
import {collection, addDoc} from 'firebase/firestore'; //for adding doc to firebase
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'; // firebase storage for uploading images
import * as ImagePicker from 'react-native-image-picker'; //for selecting event cover image
import CustomPressable from '../Components/CustomPressable';
import styles from '../styles';
// Initialize Firebase Storage
const storage = getStorage();

const CreateEventScreen = ({navigation}) => {
  // State variables to hold form data
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);

  // Function to select an image
  const pickImage = async () => {
    ImagePicker.launchImageLibrary(
      {mediaType: 'photo', quality: 1}, // Options for selecting images
      async response => {
        if (response.didCancel) return;
        if (response.errorMessage) {
          Alert.alert('Error', response.errorMessage);
          return;
        }
        if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri); // Store selected image URI
        }
      },
    );
  };

  // Function to upload image to Firebase Storage
  const uploadImage = async uri => {
    if (!uri) return null;
    const response = await fetch(uri);
    const blob = await response.blob(); // Convert image to blob for uploading
    const fileRef = ref(storage, `eventImages/${Date.now()}.jpg`); //create reference name
    await uploadBytes(fileRef, blob);
    return await getDownloadURL(fileRef);
  };

  const handleCreateEvent = async () => {
    // Ensure all required fields are filled
    if (!title || !location || !date || !category || !description) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    try {
      let imageUrl = null;
      if (imageUri) {
        imageUrl = await uploadImage(imageUri); // If image selected, upload it and get the URL
      }

      //add new event data to firestore
      await addDoc(collection(db, 'events'), {
        title,
        location,
        date,
        category,
        description,
        imageUrl,
        createdBy: auth.currentUser.uid,
      });

      Alert.alert('Success', 'Event created successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Event</Text>

      {/* Image Picker */}
      {imageUri ? (
        <Image source={{uri: imageUri}} style={styles.imagePreview} />
      ) : (
        <CustomPressable
          title="Upload Cover Photo"
          onPress={pickImage}
          // style={{width: '100%', marginBottom: 10}}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Event Title"
        placeholderTextColor={'black'}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        placeholderTextColor={'black'}
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        placeholderTextColor={'black'}
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        placeholderTextColor={'black'}
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={[styles.input, styles.description]}
        placeholder="Description"
        placeholderTextColor={'black'}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <CustomPressable
        title="Create Event"
        onPress={handleCreateEvent}
        // style={{width: '100%'}}
      />
    </View>
  );
};

export default CreateEventScreen;
