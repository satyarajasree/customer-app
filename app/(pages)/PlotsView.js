import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "../components/Api";

const { height, width } = Dimensions.get("window");
const boxSize = width / 4 - 10; // 4 boxes per row with spacing

const PlotsView = () => {
  const { area } = useLocalSearchParams();
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [uniquePhases, setUniquePhases] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState("");
  const [thirtyPercentDetails, setThirtyPercentDetails] = useState([]);
  const [customerId, setCustomerId] = useState(null);
  const [areaId, setAreaId] = useState(null);
  const [isEligibleToBook, setIsEligibleToBook] = useState(false);

  const fetchAreas = async () => {
    try {
      setLoading(true);

      // Retrieve authentication token
      const token = await SecureStore.getItemAsync("jwtToken");
      if (!token) {
        throw new Error("Authentication token not found");
      }
      const formattedToken = token.replace(/^"|"$/g, "");

      // Fetch Last Payment Details After Fetching Areas
      const lastPaymentResponse = await axios.get(
        `${API_BASE_URL}/customer/last-payement`,
        {
          headers: { Authorization: `Bearer ${formattedToken}` },
        }
      );

      setThirtyPercentDetails(lastPaymentResponse.data.amountPaidTillNow);
      setAreaId(lastPaymentResponse.data.areaId);
      setCustomerId(lastPaymentResponse.data.customerId);
      setIsEligibleToBook(lastPaymentResponse.data.eligibleForPlot);
    } catch (err) {
      setError(err.message || "Failed to fetch areas or last payment details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (area) {
      fetchPlots();
    }
  }, [area]);

  useFocusEffect(
    React.useCallback(() => {
      fetchAreas();
    }, [])
  );

  // Extract unique phases from the plots data
  useEffect(() => {
    if (plots.length > 0) {
      const phases = plots.map((plot) => plot.phase);
      const unique = [...new Set(phases)]; // filter duplicates
      setUniquePhases(unique);
      // Set selected phase to first element if not already selected
      if (!selectedPhase && unique.length > 0) {
        setSelectedPhase(unique[0]);
      }
    }
  }, [plots]);

  // Fetch all plots for the area
  const fetchPlots = async () => {
    try {
      setLoading(true);
      const token = await SecureStore.getItemAsync("jwtToken");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const formattedToken = token.replace(/^"|"$/g, "");
      const response = await axios.get(
        `${API_BASE_URL}/customer/by-area-group?areaName=${area}&groupName=FUTURE_GREEN_CITY`,
        {
          headers: {
            Authorization: `Bearer ${formattedToken}`,
          },
        }
      );

      setPlots(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch plots");
    } finally {
      setLoading(false);
    }
  };

  // Filter plots based on selected phase
  const filteredPlots = plots.filter((plot) => plot.phase === selectedPhase);

  const handlePlotPress = (plot) => {
    setSelectedPlot(plot);
    setModalVisible(true);
  };

  const makePayement = async (plotId) => {
    try {
      setLoading(true);

      // Retrieve and parse stored customer ID
      const customerData = await SecureStore.getItemAsync("customer");
      if (!customerData) {
        throw new Error("Customer ID not found");
      }
      const customerId = JSON.parse(customerData).customerId;

      const token = await SecureStore.getItemAsync("jwtToken");
      if (!token) {
        throw new Error("Authentication token not found");
      }
      const formattedToken = token.replace(/^"|"$/g, "");

      const url = `${API_BASE_URL}/customer/assign-plot?customerId=${customerId}&areaId=${areaId}&plotId=${plotId}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${formattedToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(response.message || "Payment failed.");
      }

      alert("Plot assigned successfully!");
      setModalVisible(false); // Close the modal after successful assignment
    } catch (err) {
      console.error("Payment failed:", err);
      alert(err.message || "Payment failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["grey", "#ffffff"]} style={styles.background} />
      <Text style={styles.title}>Plots in {area}</Text>

      {/* Phase Selection Dropdown */}
      {uniquePhases.length > 0 && (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedPhase}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedPhase(itemValue)}
          >
            {uniquePhases.map((phase, index) => (
              <Picker.Item key={index} label={phase} value={phase} />
            ))}
          </Picker>
        </View>
      )}

      {loading && <Text>Loading...</Text>}

      {!loading && filteredPlots.length === 0 && !error && (
        <Text>No plots available for {selectedPhase}</Text>
      )}

      <FlatList
        data={filteredPlots}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.box,
              { backgroundColor: item.active ? "#4CAF50" : "#F44336" },
            ]}
            onPress={() => handlePlotPress(item)}
          >
            <Text style={styles.boxText}>{item.plotNumber}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal for Plot Details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedPlot && (
              <>
                <Text style={styles.modalTitle}>Plot Details</Text>
                <Text style={styles.modalTitle}>{selectedPlot.phase}</Text>
                <Text style={styles.modalText}>
                  Plot Number: {selectedPlot.plotNumber}
                </Text>
                <Text style={styles.modalText}>
                  Direction: {selectedPlot.plotDirection}
                </Text>
                <Text style={styles.modalText}>
                  Price: ₹{selectedPlot.plotAmount}
                </Text>
                <Text style={styles.modalText}>
                  Status: {selectedPlot.active ? "Available" : "Sold"}
                </Text>

              
                  {selectedPlot.active && (
                    isEligibleToBook ? (
                      // Render this if the user is eligible to book
                      <Pressable
                        style={styles.closeButton}
                        onPress={() => makePayement(selectedPlot.id)}
                      >
                        <Text style={styles.closeButtonText}>Book Now</Text>
                      </Pressable>
                    ) : (
                      // Render this if the user is NOT eligible to book
                      <Text style={styles.errorText}>You are not eligible to book this plot.</Text>
                    )
                  )}
              

                <Pressable
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PlotsView;

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
    marginVertical: 10,
    color: "white",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 10,
    fontWeight: "bold",
    marginRight: 0,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  gridContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: boxSize,
    height: height / 20,
    margin: 1,
    padding: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  boxText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#ff5c5c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
