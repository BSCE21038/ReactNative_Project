import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import DatePicker from 'react-native-date-picker';
import styles from '../styles';

const daysOfWeek = ['SU', 'M', 'T', 'W', 'TH', 'F', 'S'];

const RemindersScreen = ({navigation}) => {
  const [time, setTime] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDaySelection = (day) => {
    setSelectedDays(prevDays =>
      prevDays.includes(day)
        ? prevDays.filter(d => d !== day)
        : [...prevDays, day],
    );
  };
  const handleSave = () => {
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      {/* Time Selection */}
      <Text style={styles.reminderHeading}>
        What time would you like to meditate?
      </Text>
      <Text style={styles.listDescription}>
        Any time you can choose, but we recommend first thing in the morning.
      </Text>

      <DatePicker
        date={time}
        onDateChange={setTime}
        mode="time"
        theme="light"
      />

      {/* Day Selection */}
      <Text style={styles.reminderHeading}>
        Which day would you like to meditate?
      </Text>
      <Text style={styles.listDescription}>
        Everyday is best, but we recommend picking at least five.
      </Text>

      <FlatList
        data={daysOfWeek}
        horizontal
        keyExtractor={item => item}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.dayButton,
              selectedDays.includes(item) && styles.selectedDay,
            ]}
            onPress={() => toggleDaySelection(item)}>
            <Text
              style={[
                styles.dayText,
                selectedDays.includes(item) && styles.selectedDayText,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>SAVE</Text>
      </TouchableOpacity>

      {/* No Thanks Button */}
      <TouchableOpacity onPress={() => navigation.navigate('MainHome')}>
        <Text style={styles.noThanksText}>NO THANKS</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RemindersScreen;
