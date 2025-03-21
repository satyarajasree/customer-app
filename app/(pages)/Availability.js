import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { API_BASE_URL } from "../components/Api";
import { router } from "expo-router";

const { height } = Dimensions.get("window");

const Availability = () => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("minimum");
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState(0);
  const [areaId, setAreaId] = useState(null);
  const [purchasedArea, setPurchasedArea] = useState(null);

  const makePayement = async () => {
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

      const amountToPay = getSelectedAmount(); // Use getSelectedAmount to calculate the total amount
      if (!selectedArea) {
        throw new Error("Please select an area.");
      }

      const url = `${API_BASE_URL}/customer/customer-payements?customerId=${customerId}&areaId=${selectedArea.id}&amount=${amountToPay}`;

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

      alert("Payment successful!");
    } catch (err) {
      console.error("Payment failed:", err);
      alert(err.message || "Payment failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAreas = async () => {
    try {
      setLoading(true);

      // Retrieve authentication token
      const token = await SecureStore.getItemAsync("jwtToken");
      if (!token) {
        throw new Error("Authentication token not found");
      }
      const formattedToken = token.replace(/^"|"$/g, "");

      // Fetch areas
      const response = await axios.get(
        `${API_BASE_URL}/customer/get-area/FUTURE_GREEN_CITY`,
        {
          headers: { Authorization: `Bearer ${formattedToken}` },
        }
      );

      const uniqueAreas = [
        ...new Map(response.data.map((area) => [area.id, area])).values(),
      ];

      setAreas(uniqueAreas);
      if (uniqueAreas.length > 0) {
        setSelectedArea(uniqueAreas[0]);
      }

      // Fetch Last Payment Details After Fetching Areas
      const lastPaymentResponse = await axios.get(
        `${API_BASE_URL}/customer/last-payement`,
        {
          headers: { Authorization: `Bearer ${formattedToken}` },
        }
      );

      setAmount(lastPaymentResponse.data.amountPaidTillNow);
      setAreaId(lastPaymentResponse.data.areaId);
      setPurchasedArea(lastPaymentResponse.data)
    } catch (err) {
      setError(err.message || "Failed to fetch areas or last payment details");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAreas();
    }, [])
  );

  useEffect(() => {
    if (selectedArea) {
      // Recalculate payment options based on the new selectedArea
      setSelectedPayment("minimum"); // Reset payment option to "minimum"
      setCustomAmount(""); // Reset custom amount input
    }
  }, [selectedArea]);

  const getSelectedAmount = () => {
    if (!selectedArea) return 0;
    console.log(selectedArea)
    console.log(purchasedArea)

    let selectedAmount = 0;
    if(purchasedArea === null){
      switch (selectedPayment) {
        case "minimum":
          selectedAmount = selectedArea.minimumAmount;
          break;
        case "thirtyPercent":
          selectedAmount = selectedArea.thirtyPercentageAmount;
          break;
        case "full":
          selectedAmount = selectedArea.fullAmount;
          break;
        case "custom":
          selectedAmount = customAmount ? parseFloat(customAmount) || 0 : 0;
          break;
        default:
          selectedAmount = 0;
      }
    }else{
      switch (selectedPayment) {
        case "minimum":
          selectedAmount = selectedArea.minimumAmount;
          break;
        case "thirtyPercent":
          selectedAmount = selectedArea.thirtyPercentageAmount;
          break;
        case "full":
          selectedAmount = selectedArea.fullAmount;
          break;
        case "custom":
          selectedAmount = customAmount ? parseFloat(customAmount) || 0 : 0;
          break;
        default:
          selectedAmount = 0;
      }
    }

    

    // Add ₹1000 application fee if amount is 0 (first transaction)
    if (amount === 0) {
      selectedAmount += 1000;
    }

    return selectedAmount;
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["grey", "#ffffff"]} style={styles.background} />
      {loading && <ActivityIndicator size="large" color="#22C1C3" />}

      {areas.length > 0 && (
        <>
          {amount === 0 ? (
            <Picker
              selectedValue={selectedArea?.id}
              style={styles.picker}
              onValueChange={(itemValue) => {
                const area = areas.find((area) => area.id === itemValue);
                setSelectedArea(area); // Update selectedArea state
                setSelectedPayment("minimum"); // Reset payment option to "minimum"
                setCustomAmount(""); // Reset custom amount input
              }}
            >
              {areas.map((area) => (
                <Picker.Item key={area.id} label={area.area} value={area.id} />
              ))}
            </Picker>
          ) : (
            <Picker
              selectedValue={areaId}
              style={styles.picker}
              enabled={false} // Disable picker when amount !== 0
            >
              {areas
                .filter((area) => area.id === areaId) // Only fetch area with areaId
                .map((filteredArea) => (
                  <Picker.Item
                    key={filteredArea.id}
                    label={filteredArea.area}
                    value={filteredArea.id}
                  />
                ))}
            </Picker>
          )}

          {selectedArea && (
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Choose Payment Amount:</Text>
              <View style={styles.radioContainer}>
                {[
                  {
                    label: "Minimum Amount",
                    value: "minimum",
                    amount: Math.max(0, selectedArea?.minimumAmount - amount),
                    isDisabled: selectedArea?.minimumAmount - amount <= 0,
                  },
                  {
                    label: "30% Amount",
                    value: "thirtyPercent",
                    amount: Math.max(
                      0,
                      selectedArea?.thirtyPercentageAmount - amount
                    ),
                    isDisabled:
                      selectedArea?.thirtyPercentageAmount - amount <= 0,
                  },
                  {
                    label: "Full Amount",
                    value: "full",
                    amount: Math.max(0, selectedArea?.fullAmount - amount),
                    isDisabled: selectedArea?.fullAmount - amount <= 0,
                  },
                ].map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.radioOption,
                      selectedPayment === option.value && styles.selectedRadio,
                      option.isDisabled && styles.disabledRadio,
                    ]}
                    onPress={() =>
                      !option.isDisabled && setSelectedPayment(option.value)
                    }
                    disabled={option.isDisabled}
                  >
                    <Text
                      style={[
                        styles.radioText,
                        selectedPayment === option.value && styles.selectedText,
                        option.isDisabled && styles.disabledText,
                      ]}
                    >
                      {option.label}: ₹{option.amount}
                    </Text>
                  </TouchableOpacity>
                ))}

                {/* "Enter Other Amount" option */}
                <TouchableOpacity
                  style={[
                    styles.radioOption,
                    selectedPayment === "custom" && styles.selectedRadio,
                  ]}
                  onPress={() => setSelectedPayment("custom")}
                >
                  <Text
                    style={[
                      styles.radioText,
                      selectedPayment === "custom" && styles.selectedText,
                    ]}
                  >
                    Enter Other Amount
                  </Text>
                </TouchableOpacity>

                {/* Custom Amount Input */}
                {selectedPayment === "custom" && (
                  <TextInput
                    style={styles.input}
                    placeholder="Enter amount"
                    keyboardType="numeric"
                    value={customAmount}
                    onChangeText={setCustomAmount}
                  />
                )}
              </View>

              <Text style={styles.note}>
                1000 will be added as application fee for first transaction
              </Text>

              <TouchableOpacity onPress={makePayement}>
                <LinearGradient
                  colors={["#00FFFF", "#2F4F4F"]}
                  style={styles.payButton}
                >
                  <Text style={styles.payButtonText}>
                    Pay ₹{getSelectedAmount()} {/* Use getSelectedAmount to display the correct amount */}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.paidNoteContainer}>
                <Text style={styles.paidNote}>You have paid {amount}</Text>
              </View>
            </View>
          )}
        </>
      )}
      {amount !== 0 && (
        <TouchableOpacity
          style={styles.payButton1}
          onPress={() =>
            router.push({
              pathname: "/PlotsView",
              params: { area: selectedArea.area },
            })
          }
        >
          <Text style={styles.payButtonText}>Plots View</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Availability;

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
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  picker: {
    backgroundColor: "#fff",
    marginTop: 20,
    borderRadius: 10,
  },
  detailsContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  radioContainer: {
    marginTop: 10,
  },
  radioOption: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
  },
  selectedRadio: {
    backgroundColor: "#22C1C3",
  },
  radioText: {
    fontSize: 16,
    color: "#555",
  },
  selectedText: {
    color: "white",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginTop: 10,
    backgroundColor: "#fff",
  },
  payButton: {
    backgroundColor: "#22C1C3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  payButton1: {
    backgroundColor: "#FF9800",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  disabledRadio: {
    backgroundColor: "#ddd", // Gray out disabled buttons
  },
  disabledText: {
    color: "#aaa", // Light gray text for disabled options
  },
  note: {
    textAlign: "center",
    color: "red",
    fontWeight: "900",
  },
  paidNoteContainer: {
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "green",
    marginVertical: 10,
  },
  paidNote: {
    textAlign: "center",
    color: "black",
    fontWeight: "900",
  },
});