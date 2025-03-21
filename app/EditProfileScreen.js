import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import * as SecureStore from "expo-secure-store";

const {width, height} = Dimensions.get('window')

const EditProfileScreen = () => {
   const [customer, setCustomer] = useState();
  
    const fetchEmployee = async () => {
      try {
        const customerData = await SecureStore.getItemAsync("customer");
        const token = await SecureStore.getItemAsync("jwtToken");
        if (customerData) {
          setCustomer(JSON.parse(customerData));
        } else {
          console.error("No employee data found");
        }
      } catch (error) {
        console.error("Error retrieving employee data:", error);
      }
    };
  
    useEffect(() => {
      fetchEmployee();
    }, []);

  return (
    <ScrollView style={styles.container}>
  {
    customer ? (
      <>
      <Image source={{uri:`${customer.profileImagePath}`}} style={styles.image} resizeMode="cover"/>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#999"
        value={customer.customerName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#999"
        value={customer.email}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#999"
        value={customer.mobileNumber}
      />
       <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#999"
        value={customer.primaryAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Nominee name"
        placeholderTextColor="#999"
        value={customer.nomineeName}
      />

      </>
    ):(<>
    </>)
  }
     
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.changeButton}>
        <Text style={styles.changeButtonText}>Change</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 16,
    color: '#FFA500',
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  changeButton: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
    marginBottom: 10
  },
  changeButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: width * 0.9,
    height: width * 0.7,
    borderRadius: width * 0.23, // Circular image
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#ddd", // Light border color
  },
});

export default EditProfileScreen;