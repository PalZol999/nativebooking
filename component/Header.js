// Header.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Header = ({ onLogout, onProfile})=> {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onProfile} style={styles.headerButton}>
        <Text style={styles.headerButtonText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onLogout} style={styles.headerButton}>
        <Text style={styles.headerButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#5257F2',
  },
  headerButton: {
    padding: 10,
    marginHorizontal: 20, // Add some space between buttons
  },
  headerButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Header;
