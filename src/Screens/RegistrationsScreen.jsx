import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, 
  FlatList, ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const RegistrationScreen = ({ route, navigation }) => {
  const { event } = route.params;
  
  const [availableSeats, setAvailableSeats] = useState(20);
  const [numSeats, setNumSeats] = useState(1);
  const [registrations, setRegistrations] = useState([]);

  const handleRegister = () => {
    if (numSeats > availableSeats) {
      Alert.alert('Error', 'Not enough seats available.');
      return;
    }

    let userDetails = [];
    for (let i = 0; i < numSeats; i++) {
      userDetails.push({ id: i, name: '', contact: '' });
    }
    setRegistrations(userDetails);
  };

  const confirmRegistration = () => {
    if (registrations.some(r => r.name === '' || r.contact === '')) {
      Alert.alert('Error', 'Please fill out all details.');
      return;
    }

    setAvailableSeats(prevSeats => prevSeats - numSeats);
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
                {/* Back Button */}
                <View style={styles.container1}>
                  <Text style={styles.header}>Register for {"\n"}{event.title}</Text>
                  <Text style={styles.seats}>
                    <Text style={{ fontWeight: 'bold' }}>Availability: </Text>
                    {availableSeats} Persons
                  </Text>

                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={String(numSeats)}
                    onChangeText={text => setNumSeats(Number(text))}
                    placeholder="Enter Number"
                  />

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
                  placeholder="Name"
                  onChangeText={text => {
                    let updatedList = [...registrations];
                    updatedList[index].name = text;
                    setRegistrations(updatedList);
                  }}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Contact No."
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
    width: '100%',
    height: '100%',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  backIcon: {
    position: 'absolute',
    top: 20, 
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
    width: "90%",
    textAlign: "center",
  },
  proceedButton: {
    backgroundColor: "black", 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "90%", 
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
    width: "90%", 
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
