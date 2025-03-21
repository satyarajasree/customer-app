import React, { useEffect, useState } from "react";
import { 
  Dimensions, 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Modal, 
  Pressable 
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "../components/Api";

const { height, width } = Dimensions.get("window");
const boxSize = width / 4 - 10; // 4 boxes per row with spacing

const SaiKeshavaPlotsView = () => {
  const { area } = useLocalSearchParams();
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchPlots = async () => {
    try {
      setLoading(true);
      const token = await SecureStore.getItemAsync("jwtToken");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const formattedToken = token.replace(/^"|"$/g, "");
      const response = await axios.get(
        `${API_BASE_URL}/customer/by-area-group?areaName=${area}&groupName=SAI_KESHAVA`,
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

  useEffect(() => {
    if (area) {
      fetchPlots();
    }
  }, [area]);

  const handlePlotPress = (plot) => {
    setSelectedPlot(plot);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["grey", "#ffffff"]} style={styles.background} />
      <Text style={styles.title}>Plots in {area}</Text>

      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
      {!loading && plots.length === 0 && !error && <Text>No plots available</Text>}

      <FlatList
        data={plots}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.box, { backgroundColor: item.active ? "#4CAF50" : "#F44336" }]} 
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
                <Text style={styles.modalText}>Plot Number: {selectedPlot.plotNumber}</Text>
                <Text style={styles.modalText}>Direction: {selectedPlot.plotDirection} </Text>
                <Text style={styles.modalText}>Price: ₹{selectedPlot.plotAmount}</Text>
                <Text style={styles.modalText}>Status: {selectedPlot.active ? "Available" : "Sold"}</Text>

                <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
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

export default SaiKeshavaPlotsView;

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
    marginVertical: 20,
    color: "white",
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
