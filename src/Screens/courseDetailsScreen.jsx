import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';

const sessions = [
  {id: '1', title: 'Focus Attention', duration: '10 MIN'},
  {id: '2', title: 'Body Scan', duration: '5 MIN'},
  {id: '3', title: 'Making Happiness', duration: '3 MIN'},
];
const CourseDetailsScreen = () => {
  const navigation = useNavigation();
  const [selectedVoice, setSelectedVoice] = useState('Male');
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <Icon
        name="arrow-back"
        size={30}
        color="#6A5ACD"
        backgroundColor="#F2F2F2"
        borderRadius={50}
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      />
      {/* Heart Icon */}
      <Icon
        name={liked ? 'heart' : 'heart-outline'}
        size={30}
        color={liked ? 'red' : '#6A5ACD'}
        backgroundColor="#F2F2F2"
        borderRadius={50}
        style={styles.heartIcon}
        onPress={() => setLiked(!liked)}
      />
      {/* Course Image */}
      <Image
        source={require('../../assets/sun.png')}
        style={styles.courseImage}
      />
      {/* Course title and description */}
      <Text style={styles.courseTitle}>Happy Morning</Text>
      <Text style={styles.courseCategory}>COURSE</Text>
      <Text style={styles.courseDescription}>
        Ease the mind into a restful night's sleep with these deep, ambient
        tones.
      </Text>
      {/* Favorites Count */}
      <Text style={styles.favoriteText}>❤️ 24,234 Favorites</Text>
      {/* Narrator Selection */}
      <Text style={styles.narratorLabel}>Pick a Narrator</Text>
      <View style={styles.narratorContainer}>
        <TouchableOpacity
          onPress={() => setSelectedVoice('Male')}
          style={styles.narratorOptionWrapper}>
          <Text
            style={[
              styles.narratorOption,
              selectedVoice === 'Male' && styles.selectedVoice,
            ]}>
            MALE VOICE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedVoice('Female')}
          style={styles.narratorOptionWrapper}>
          <Text
            style={[
              styles.narratorOption,
              selectedVoice === 'Female' && styles.selectedVoice,
            ]}>
            FEMALE VOICE
          </Text>
        </TouchableOpacity>
      </View>
      {/* Session List */}
      <FlatList
        data={sessions}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.sessionItem}>
            <Icon
              name="play-circle"
              size={30}
              color="#6A5ACD"
              style={styles.playIcon2}
            />
            <View>
              <Text style={styles.sessionTitle}>{item.title}</Text>
              <Text style={styles.sessionDuration}>{item.duration}</Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default CourseDetailsScreen;
