import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL } from '../components/Api';
import PaidScreen from '../components/PaidScreen';
import UnpaidScreen from '../components/UnpaidScreen';

const Tab = createMaterialTopTabNavigator();

function Billings() {
  const [emis, setEmis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmis();
  }, []);

  const fetchEmis = async () => {
    try {
      setLoading(true);
      const token = await SecureStore.getItemAsync("jwtToken");
      if (!token) throw new Error('Token not found');
      const formattedToken = token.replace(/^"|"$/g, "");

      const response = await fetch(`${API_BASE_URL}/customer/customer/emi-list`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${formattedToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch EMIs');

      const data = await response.json();
      setEmis(data);
    } catch (error) {
      console.error('Error fetching EMIs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async (emiId) => {
    Alert.alert(
      "Confirm Payment",
      "Are you sure you want to mark this EMI as paid?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: async () => await processEmiPayment(emiId) },
      ]
    );
  };

  const processEmiPayment = async (emiId) => {
    try {
      const token = await SecureStore.getItemAsync("jwtToken");
      if (!token) throw new Error('Token not found');
      const formattedToken = token.replace(/^"|"$/g, "");

      const response = await fetch(`${API_BASE_URL}/customer/payEmi/${emiId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${formattedToken}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.text();
      if (!response.ok) throw new Error(result);

      Alert.alert("Success", "EMI marked as paid successfully!");
      fetchEmis(); // Refresh EMI list
    } catch (error) {
      Alert.alert("Error", error.message);
      console.error('Error processing EMI:', error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="blue" style={styles.loader} />;
  }

  return (
    <Tab.Navigator screenOptions={{ tabBarStyle: { backgroundColor: 'snow' } }}>
      <Tab.Screen name="Paid">
        {() => <PaidScreen emis={emis} />}
      </Tab.Screen>
      <Tab.Screen name="Unpaid">
        {() => <UnpaidScreen emis={emis} onPay={handlePay} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Billings;
