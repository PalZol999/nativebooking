import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface User {
  first_name: string;
  last_name: string;
}

const useFetchUserData = (): User | null => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const first_name = await AsyncStorage.getItem('first_name');
        const last_name = await AsyncStorage.getItem('last_name');
        if (first_name && last_name) {
          setUser({ first_name, last_name });
        } else {
          console.warn('User data not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return user;
};

export default useFetchUserData;
