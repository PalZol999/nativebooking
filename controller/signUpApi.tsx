import axios from 'axios';

const checkUserSignUp = async (first_name: string, last_name: string, date: string) => {
  try {
    const response = await axios.post('your_server_endpoint/check_signup', {
      first_name,
      last_name,
      date,
    });
    return response.data.isSignedUp;
  } catch (error) {
    console.error('Error checking user sign-up:', error);
    return false;
  }
};

const signUpUser = async (first_name: string, last_name: string, date: string) => {
  try {
    await axios.post('your_server_endpoint/signup', {
      first_name,
      last_name,
      date,
    });
  } catch (error) {
    console.error('Error signing up user:', error);
  }
};

export { checkUserSignUp, signUpUser };