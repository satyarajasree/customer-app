import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';
import { router } from 'expo-router';
import * as SecureStore from "expo-secure-store";

const Logout = () => {
   const handleLogout = async () => {
      try {
        // Clear session or token (example with SecureStore)
        await SecureStore.deleteItemAsync("customer");
  
        // Navigate to the login screen after logout
        router.push("/(login)");
      } catch (error) {
        console.log("Error during logout:", error);
      }
    };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="darkslategrey" barStyle="light-content"/>
      <LottieView
        source={require('../assets/anime/logout.json')} // Ensure correct animation path
        autoPlay
        loop
        style={styles.animation}
      />

      <Text style={styles.confirmText}>Are you sure you want to logout?</Text>

      <View style={styles.buttonContainer}>
        <LogoutButton text="Yes" onPress={handleLogout} buttonStyle={styles.yesButton} />
        <LogoutButton text="No" onPress={handleCancel} buttonStyle={styles.noButton} />
      </View>
    </View>
  );
};

const LogoutButton = ({ text, onPress, buttonStyle }) => (
  <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkslategrey',
  },
  animation: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.5, // 50% of screen height
  },
  confirmText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  yesButton: {
    backgroundColor: 'red',
  },
  noButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Logout;
