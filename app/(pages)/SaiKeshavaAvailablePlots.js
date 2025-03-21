import React, { useEffect, useRef, useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  ActivityIndicator, 
  RefreshControl, 
  TouchableOpacity,
  Alert,
  Dimensions
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { API_BASE_URL } from "../components/Api";
import { router } from "expo-router";

const {height, width} = Dimensions.get('window');

const SaiKeshavaAvailablePlots = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchAreas = async () => {
    try {
      setLoading(true);
      const token = await SecureStore.getItemAsync("jwtToken");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const formattedToken = token.replace(/^"|"$/g, "");
      const response = await axios.get(
        `${API_BASE_URL}/customer/get-area/SAI_KESHAVA`,
        {
          headers: {
            Authorization: `Bearer ${formattedToken}`,
          },
        }
      );

      setAreas(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch areas");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchAreas();
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAreas();
    }, [])
  );

  const handlePress = (item) => {
    Alert.alert("Area Selected", `You selected ${item.area}`);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["grey", "#ffffff"]}
        style={styles.background}
      />

      <Text style={styles.title}>Available Areas</Text>

      {loading && <ActivityIndicator size="large" color="#22C1C3" />}

      {error && <Text style={styles.error}>{error}</Text>}

      {!loading && areas.length === 0 && !error && (
        <Text style={styles.noData}>No areas available</Text>
      )}

      <FlatList
        data={areas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.areaCard} onPress={() => router.push({ pathname: "/SaiKeshavaPlotsView", params: { area: item.area } })}>
            <Text style={styles.areaName}>{item.area}</Text>
            <Text style={styles.details}>Min Amount: ₹{item.minimumAmount}</Text>
            <Text style={styles.details}>30% Amount: ₹{item.thirtyPercentageAmount}</Text>
            <Text style={styles.details}>Full Amount: ₹{item.fullAmount}</Text>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default SaiKeshavaAvailablePlots;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 10,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "white",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  noData: {
    textAlign: "center",
    marginTop: 10,
    color: "#666",
  },
  areaCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  areaName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#22C1C3",
  },
  details: {
    fontSize: 14,
    color: "#555",
    marginTop: 3,
  },
});
