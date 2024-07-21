import axios from 'axios';

const handleAddPress = async (user: any, date: Date, setModalVisible: any) => {
  if (!user || !date) return;

  const appointment_date = date.toISOString().split('T')[0]; // Format date as needed

  try {
    // Check if booking already exists
    const checkResponse = await axios.post('http://localhost:3000/api/checkBooking', {
      first_name: user.first_name,
      last_name: user.last_name,
      appointment_date,
    });

    if (checkResponse.data.exists) {
      alert('You are already booked for this date');
      return;
    }

    // Proceed with adding the booking
    const response = await axios.post('http://localhost:3000/api/signin', {
      first_name: user.first_name,
      last_name: user.last_name,
      appointment_date,
    });

    if (response.status === 201) {
      alert('Signed in successfully!');
    } else {
      alert('Failed to sign in.');
    }
  } catch (error) {
    console.error('Error signing in:', error);
    alert('An error occurred while signing in.');
  } finally {
    setModalVisible(false); // Close the modal after the operation
  }
};

export default handleAddPress;
