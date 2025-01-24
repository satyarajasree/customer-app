import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';

const SignUpForm = () => {
  const [form, setForm] = useState({
    customerName: '',
    fatherName: '',
    dateOfBirth: '',
    age: '',
    aadharNumber: '',
    mobileNumber: '',
    email: '',
    city: '',
    pincode: '',
    groupName: '',
    panNumber: '',
    primaryAddress: '',
    nomineeName: '',
    occupation: '',
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    const { customerName, aadharNumber, mobileNumber, email, panNumber } = form;

    // Basic validation
    if (!customerName || !aadharNumber || !mobileNumber || !email || !panNumber) {
      Alert.alert('Validation Error', 'Please fill all the required fields.');
      return;
    }

    // Further validation for specific fields (e.g., email format, length of mobile number, etc.)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.match(emailPattern)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    if (mobileNumber.length !== 10) {
      Alert.alert('Validation Error', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    // Handle form submission (API call to backend can be added here)
    Alert.alert('Success', 'Sign-Up Successful!');
    console.log('Form Data:', form);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Create Your Account</Text>
        
        {/* Customer Name */}
        <TextInput
          style={styles.input}
          placeholder="Customer Name"
          value={form.customerName}
          onChangeText={(value) => handleChange('customerName', value)}
        />

        {/* Father's Name */}
        <TextInput
          style={styles.input}
          placeholder="Father/Guardian's Name"
          value={form.fatherName}
          onChangeText={(value) => handleChange('fatherName', value)}
        />

        {/* Date of Birth */}
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={form.dateOfBirth}
          onChangeText={(value) => handleChange('dateOfBirth', value)}
        />

        {/* Age */}
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter your age"
          value={form.age}
          onChangeText={(value) => handleChange('age', value)}
        />

        {/* Aadhar Number */}
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={12}
          placeholder="Aadhar Number (12 digits)"
          value={form.aadharNumber}
          onChangeText={(value) => handleChange('aadharNumber', value)}
        />

        {/* Mobile Number */}
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          placeholder="Mobile Number"
          value={form.mobileNumber}
          onChangeText={(value) => handleChange('mobileNumber', value)}
        />

        {/* Email */}
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Email Address"
          value={form.email}
          onChangeText={(value) => handleChange('email', value)}
        />

        {/* City */}
        <TextInput
          style={styles.input}
          placeholder="City"
          value={form.city}
          onChangeText={(value) => handleChange('city', value)}
        />

        {/* Pincode */}
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Pincode"
          value={form.pincode}
          onChangeText={(value) => handleChange('pincode', value)}
        />

        {/* Group Name */}
        <TextInput
          style={styles.input}
          placeholder="Group Name (if any)"
          value={form.groupName}
          onChangeText={(value) => handleChange('groupName', value)}
        />

        {/* PAN Number */}
        <TextInput
          style={styles.input}
          placeholder="PAN Number"
          value={form.panNumber}
          onChangeText={(value) => handleChange('panNumber', value)}
        />

        {/* Primary Address */}
        <TextInput
          style={styles.input}
          placeholder="Primary Address"
          value={form.primaryAddress}
          onChangeText={(value) => handleChange('primaryAddress', value)}
        />

        {/* Nominee Name */}
        <TextInput
          style={styles.input}
          placeholder="Nominee Name"
          value={form.nomineeName}
          onChangeText={(value) => handleChange('nomineeName', value)}
        />

        {/* Occupation */}
        <TextInput
          style={styles.input}
          placeholder="Occupation"
          value={form.occupation}
          onChangeText={(value) => handleChange('occupation', value)}
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  scrollView: {
    paddingBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#B22222',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: '#B22222',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignUpForm;
