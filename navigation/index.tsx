import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Loading from '../screens/LoadingScreen';
import Register from '../screens/RegisterScreen';
import MyDatePicker from '../screens/DatePicker'
import Login from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">

      <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ 
        title: 'Login', 
        headerBackTitle: 'Login',
      }}/>
        <Stack.Screen name="LoginScreen" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="MyDatePicker" component={MyDatePicker} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }}  />

  </Stack.Navigator>
    </NavigationContainer>
  );
}


/* initialRouteName="Loading" will be the 1st screen visible

        <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ 
        title: 'Login', 
        headerBackTitle: 'Login',
      }}/>
        <Stack.Screen name="LoginScreen" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="DateToPick" component={MyDatePicker} options={{ headerShown: false }} />
    

*/
