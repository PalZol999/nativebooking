import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  first_name: string;
  last_name: string;
}

const handleAddPress = async (user: User, date: Date, setModalVisible: (visible: boolean) => void) => {
  try {
    const response = await fetch('http://localhost:3000/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: user.first_name,
        last_name: user.last_name,
        appointment_date: date.toISOString().split('T')[0],
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Inserted into signed_in:', result);
      setModalVisible(true);
    } else {
      alert('Error');
    }
  } catch (err) {
    console.error('Error:');
    alert('Error');
  }
};

export default handleAddPress;
