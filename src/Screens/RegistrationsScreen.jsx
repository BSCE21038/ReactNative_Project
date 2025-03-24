import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, 
  FlatList, ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegistrationScreen = ({ route, navigation }) => {
  const { event } = route.params;
  
  const [availableSeats, setAvailableSeats] = useState(20);
  const [numSeats, setNumSeats] = useState('');
  const [registrations, setRegistrations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Load available seats from AsyncStorage
  useEffect(() => {
    const loadAvailability = async () => {
      try {
        const storedSeats = await AsyncStorage.getItem(`availableSeats_${event.id}`);
        if (storedSeats !== null) {
          setAvailableSeats(parseInt(storedSeats, 10));
        }
      } catch (error) {
        console.log("Error loading seat availability:", error);
      }
    };    
    loadAvailability();
  }, []);

  const validateInput = (text) => {
    if (text === '') {
      setNumSeats('');
      setErrorMessage('');
      return;
    }

    const seatCount = Number(text);
    
    if (isNaN(seatCount) || seatCount <= 0 || seatCount > availableSeats) {
      setErrorMessage(`Enter a valid number (1-${availableSeats})`);
      return;
    }

    setErrorMessage('');
    setNumSeats(text);
  };

  const handleRegister = () => {
    if (numSeats === '' || isNaN(Number(numSeats)) || Number(numSeats) <= 0 || Number(numSeats) > availableSeats) {
      setErrorMessage(`Enter a valid number (1-${availableSeats})`);
      return;
    }

    let userDetails = [];
    for (let i = 0; i < Number(numSeats); i++) {
      userDetails.push({ id: i, name: '', contact: '' });
    }
    setRegistrations(userDetails);
  };

  const confirmRegistration = async () => {
    if (registrations.some(r => r.name === '' || r.contact === '')) {
      Alert.alert('Error', 'Please fill out all details.');
      return;
    }

    const newAvailableSeats = availableSeats - Number(numSeats);
    setAvailableSeats(newAvailableSeats);

    try {
      await AsyncStorage.setItem(`availableSeats_${event.id}`, newAvailableSeats.toString());
    } catch (error) {
      console.log("Error saving seat availability:", error);
    }

    Alert.alert('Success', 'Registration was successful!');
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={require('../../assets/Mask.png')} style={styles.container}>
      <Icon name="arrow-back" size={30} color="#6A5ACD" style={styles.backIcon} onPress={() => navigation.goBack()} />
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <FlatList
            ListHeaderComponent={(
              <>
                <View style={styles.container1}>
                  <Text style={styles.header}>Register for {"\n"}{event.title}</Text>
                  <Text style={styles.seats}>
                    <Text style={{ fontWeight: 'bold' }}>Availability: </Text>
                    {availableSeats} Persons
                  </Text>

                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholderTextColor="black"
                    placeholder="Enter Number"
                    value={numSeats}
                    onChangeText={validateInput}
                  />

                  {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

                  <TouchableOpacity style={styles.proceedButton} onPress={handleRegister}>
                    <Text style={styles.proceedButtonText}>Proceed</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            data={registrations}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.registrationBox}>
                <Text style={styles.label}>Attendee {index + 1}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="black"
                  value={item.name}
                  onChangeText={text => {
                    let updatedList = [...registrations];
                    updatedList[index].name = text;
                    setRegistrations(updatedList);
                  }}
                />
                <TextInput
                  style={styles.input}
                  value={item.contact}
                  placeholder="Contact No."
                  placeholderTextColor="black"
                  keyboardType="phone-pad"
                  onChangeText={text => {
                    let updatedList = [...registrations];
                    updatedList[index].contact = text;
                    setRegistrations(updatedList);
                  }}
                />
              </View>
            )}
            ListFooterComponent={registrations.length > 0 && (
              <TouchableOpacity style={styles.confirmButton} onPress={confirmRegistration}>
                <Text style={styles.confirmButtonText}>Confirm Registration</Text>
              </TouchableOpacity>
            )}
          />
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    width: '100%',
    height: '100%',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  backIcon: {
    position: 'absolute',
    top: 18, 
    left: 20, 
    zIndex: 20, 
    backgroundColor: 'white',
    borderRadius: 20, 
    padding: 5, 
    color:"black",
  },  
  header: {
    marginTop:30,
    fontSize: 24,
    fontWeight: 'bold',
    color: "black",
    textAlign: "center",
    marginBottom: 10,
  },
  seats: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    width: "97%",
    textAlign: "center",
    color: "black",
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  proceedButton: {
    backgroundColor: "black", 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "97%", 
    marginTop: 10,
  },  
  proceedButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },  
  confirmButton: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: "95%", 
    marginVertical: 10,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  registrationBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default RegistrationScreen;
