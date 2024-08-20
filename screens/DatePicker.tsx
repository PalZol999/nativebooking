import React, { useState } from 'react';
import { TouchableOpacity, View, Platform, Image, StyleSheet, Text, Modal, StatusBar } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import HeaderImage from '../assets/DateImage1.jpg';
import CoachImage from '../assets/coach.jpeg';
import nodate from '../assets/banana.png';
import Header from '../component/Header';
import { RootStackParamList } from '../navigation/types';
import useFetchUserData from '../controller/fetchUserData';
import handleAddPress from '../controller/handlePress'; // Importing handleAddPress
import ProfileScreen from './ProfileScreen';

type MyDatePickerNavigationProp = StackNavigationProp<RootStackParamList, 'MyDatePicker'>;

export default function MyDatePicker() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showCard, setShowCard] = useState(false); // Initially hidden

  const user = useFetchUserData();
  const navigation = useNavigation<MyDatePickerNavigationProp>();

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);

    // Check if the date is valid and set the card visibility
    if (isValidAppointmentDate(currentDate)) {
      setShowCard(true);
    } else {
      setShowCard(false);
    }

    setShow(Platform.OS === 'ios'); // Keep the picker open on iOS
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
  };

  const isValidAppointmentDate = (date: Date) => {
    const day = date.getDay();
    return day === 1 || day === 3 || day === 5; // Monday, Wednesday, Friday
  };

  const handleAddPressWrapper = () => {
    handleAddPress(user!, date, setModalVisible);
    setShowCard(false); // Hide the card after adding
  };

  const handleLogout = () => {
    navigation.navigate('LoginScreen');
  };

  const handleProfile = () => {
    navigation.navigate('ProfileScreen');
  };

  const handleClosePress = () => {
    setShowCard(false); // Hide the card
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header onLogout={handleLogout} onProfile={handleProfile} />
      <Image source={HeaderImage} style={styles.image} />
      <View style={styles.datePickerContainer}>
        <TouchableOpacity onPress={() => showMode('date')} style={styles.button}>
          <Text style={{ color: 'yellow', fontSize: 18 }}>Show Date Picker</Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
        <Image source={nodate} style={styles.images} />
      </View>
      {showCard && (
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Image source={CoachImage} style={styles.coachImage} />
            <View style={styles.textContainer}>
              <Text style={styles.coachName}>Zoltan "Pierre" Palasti</Text>
              <Text style={styles.coachName}>6:00 am</Text>
              <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleAddPressWrapper}>
                  <Text style={styles.addText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleClosePress} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>You have been added to the super 6:00am course: {date.toDateString()}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5257F2',
  },
  image: {
    width: '100%',
    height: '50%',
    resizeMode: 'cover',
  },
  datePickerContainer: {
    flex: 1,
    alignItems: 'center',
    color: 'black',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: -200,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  coachImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  coachName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
  images: {
    width: 140,
    height: 140,
    marginTop: 20,
    opacity: 0.8, // Adjust opacity as needed
  },
  button: {
    backgroundColor: '#6a51ae',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addText: {
    color: 'blue',
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#6a51ae',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
