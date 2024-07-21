import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import useFetchUserData from '../controller/fetchUserData';
import { Booking } from '../component/Interface';

const ProfileScreen: React.FC = () => {
  const user = useFetchUserData();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      if (user) {
        const response = await axios.get('http://localhost:3000/api/bookings', {
          params: { first_name: user.first_name, last_name: user.last_name },
        });
        setBookings(response.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      alert('An error occurred while fetching bookings.');
    }
  };

  const cancelBooking = async (appointment_date: string) => {
    try {
      if (user) {
        const response = await axios.delete('http://localhost:3000/api/bookings', {
          data: { first_name: user.first_name, last_name: user.last_name, appointment_date },
        });

        if (response.status === 200) {
          Alert.alert('Booking cancelled successfully');
          fetchBookings(); // Refresh bookings after cancellation
        } else {
          Alert.alert('Failed to cancel booking');
        }
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('An error occurred while cancelling the booking.');
    }
  };

  const renderItem = ({ item }: { item: Booking }) => (
    <View style={styles.bookingItem}>
      <Text style={styles.bookingText}>Date: {new Date(item.appointment_date).toDateString()}</Text>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => cancelBooking(item.appointment_date)}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  if (!user) {
    return <Text>Loading...</Text>; // Or any other loading indicator
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.header}>My Bookings</Text>
      {bookings.length > 0 ? (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.appointment_date}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noBookingsText}>No bookings available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    backgroundColor: '#6a51ae',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bookingItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingText: {
    fontSize: 18,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
  noBookingsText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProfileScreen;
