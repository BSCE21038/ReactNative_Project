import React, {useState} from 'react';
import {View, Text, TextInput, Alert, StyleSheet, Image} from 'react-native';
import {db, auth} from '../../firebaseConfig';
import {collection, addDoc} from 'firebase/firestore';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import * as ImagePicker from 'react-native-image-picker';
import CustomPressable from '../Components/CustomPressable';

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
    const blob = await response.blob(); // Convert image to binary blob
    const fileRef = ref(storage, `eventImages/${Date.now()}.jpg`);
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
        imageUrl = await uploadImage(imageUri);
      }

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
          style={{width: '100%', marginBottom: 10}}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Event Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={[styles.input, styles.description]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <CustomPressable
        title="Create Event"
        onPress={handleCreateEvent}
        style={{width: '100%'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    height: 80,
    textAlignVertical: 'top',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
});

export default CreateEventScreen;
