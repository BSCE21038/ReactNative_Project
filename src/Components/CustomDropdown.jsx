import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

// reusable card
const CustomDropdown = ({selectedValue, onValueChange}) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
        dropdownIconColor="black">
        <Picker.Item label="Role" value="" enabled={false} color="gray" />
        <Picker.Item label="User" value="user" />
        <Picker.Item label="Organizer" value="organizer" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    height: '100%',
    width: '78%',
    color: 'black',
  },
});

export default CustomDropdown;
