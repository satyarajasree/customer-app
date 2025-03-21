import React, { useEffect, useRef, useState } from 'react';
import { 
  Dimensions, 
  StyleSheet, 
  View, 
  FlatList, 
  Text, 
  ActivityIndicator, 
  TouchableOpacity,
  Image
} from 'react-native';
import LottieView from "lottie-react-native";
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL } from '../components/Api';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const animation = useRef(null);

  const getToken = async () => {
    try {
      return await SecureStore.getItemAsync('jwtToken');
    } catch (error) {
      console.error("Error getting token", error);
      return null;
    }
  };

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      if (!token) {
        console.error("JWT Token not found!");
        return;
      }

      const formattedToken = token.replace(/^"|"$/g, "");

      const response = await fetch(`${API_BASE_URL}/customer/customer-properties`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${formattedToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }

      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : properties.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Properties Found</Text>
        </View>
      ) : (
        <FlatList
          data={properties}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.propertyCard}
              onPress={() => router.push(`/MyPropertyDetails?id=${item.id}`)}
            >
              <Image 
                source={require('../../assets/images/IMG_5187.jpg')} // Ensure the API provides a valid image URL
                style={styles.propertyImage}
                resizeMode="cover"
              />
              <View style={styles.propertyDetails}>
                <Text style={styles.title}>{item.groupName}</Text>
                <Text style={styles.plot}>Plot : {item.plotNumber}</Text>
                <Text style={styles.text}>Passbook: {item.passbook}</Text>
                <Text style={styles.text}>Purchase Date: {new Date(item.purchaseDate).toDateString()}</Text>
                <Text style={styles.text}>Amount Paid: ₹{item.amountPaid}</Text>
                <Text style={styles.text}>Remaining Amount: ₹{item.remainingAmount}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default MyProperties;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  loader: {
    marginTop: height / 3,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    marginTop: 10,
  },
  lottie: {
    width: width / 1.5,
    height: height / 3.5,
  },
  propertyCard: {
    flexDirection: 'row', 
    backgroundColor: "#f8f9fa",
    padding: 7,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  propertyImage: {
    width: width * 0.3, 
    height: width * 0.4, 
    borderRadius: 10,
    marginRight: 15,
  },
  propertyDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: 'tomato',
  },
  plot: {
    fontWeight: '900',
    fontSize: width * 0.05,
  },
  text: {
    fontSize: 14,
    color: "#555",
  },
});
