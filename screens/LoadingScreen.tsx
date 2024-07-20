import React, { useEffect, useRef } from 'react';
import {  View, StyleSheet, Image, Animated } from 'react-native';
import Logo from '../assets/bb_icon.png';

import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import AppLoading from 'expo-app-loading';

type Props = {
  navigation: any;
};

export default function Loading({ navigation }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity of 0
  const dropAnim = useRef(new Animated.Value(-200)).current; // Initial position above the view

  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1, // Fade in to opacity 1
        duration: 1000, // Duration of 1 second
        useNativeDriver: true,
      }),
      Animated.timing(dropAnim, {
        toValue: 0, // Drop to initial position
        duration: 300, // Fast drop duration
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(dropAnim, {
          toValue: -50, // Bounce up
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(dropAnim, {
          toValue: 0, // Drop down
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(dropAnim, {
          toValue: -20, // Smaller bounce up
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(dropAnim, {
          toValue: 0, // Drop down
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Navigate to the login page after 3 seconds
    const timer = setTimeout(() => {
      navigation.navigate('LoginScreen');
    }, 3500);

    // Clear the timer on unmount
    return () => clearTimeout(timer);
  }, [fadeAnim, dropAnim, navigation, fontsLoaded]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateY: dropAnim }] }}>
        <Image source={Logo} style={styles.image} />
      </Animated.View>
      <Animated.Text style={[styles.pacificoRegular, { opacity: fadeAnim }]}>
        WODrop
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5257F2',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    opacity: 0.8, // Adjust opacity as needed
  },
  pacificoRegular: {
    fontFamily: 'Pacifico_400Regular',
    fontSize: 40,
    color: 'white',
    marginTop: -60,
  },
});










/*       FOR THE FONT STYLE

1/ in the cli:
expo install expo-font @expo-google-fonts/pacifico

2/ In the file:
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import AppLoading from 'expo-app-loading';

3/ inside the function
 let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

4/ at the end of the fucntion
    if (!fontsLoaded) {
    return <AppLoading />;
  }

5/ as CSS:
  pacificoRegular: {
    fontFamily: 'Pacifico_400Regular',


*/