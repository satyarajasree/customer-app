import { router } from 'expo-router';
import React, { useState, useRef } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';


const {width, height} = Dimensions.get('window');
const otp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // Array for each digit
  const inputRefs = useRef([]); // Using useRef to manage input field references

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;

    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus(); // Move to the next input field
    }

    setOtp(newOtp);
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Move to the previous input field
    }
  };

  const handleOtpSubmit = () => {
    const finalOtp = otp.join('');
    if (finalOtp.length === 6) {
      Alert.alert('OTP Submitted', `Your OTP: ${finalOtp}`);
      // Add OTP verification logic here
    } else {
      Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)} // Store references for auto-focus
            style={styles.otpInput}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(event) => handleKeyPress(event, index)} // Handle backspace
            keyboardType="numeric"
            maxLength={1} // Single digit
          />
        ))}
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={()=>router.push('/(tabs)')}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width*0.9,
    marginBottom: 24,
  },
  otpInput: {
    height: width*0.16,
    width: width*0.15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: width*0.05,
    backgroundColor: '#f9f9f9',
    elevation: 2, // Shadow effect
    margin: 1
  },
  submitButton: {
    backgroundColor: '#ff5722',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: width*0.7,
    alignItems: 'center',
    elevation: 3, // Shadow effect
  },
  buttonText: {
    color: '#fff',
    fontSize: width*0.05,
    fontWeight: 'bold',
  },
});

export default otp;
