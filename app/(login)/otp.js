import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Modal,
} from "react-native";
import axios from "axios";
import { API_BASE_URL } from "../components/Api";
import * as SecureStore from "expo-secure-store";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

const otp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Array for OTP digits
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const inputRefs = useRef([]);
  const route = useRoute();
  const { mobileNumber } = route.params;
  const animation = useRef(null);

  useEffect(() => {
    animation.current?.play();
  }, []);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;

    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus(); // Move to the next input field
    }

    setOtp(newOtp);
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Move to the previous input field
    }
  };

  const saveDataSecurely = async (key, value) => {
    try {
      await SecureStore.setItemAsync(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to save ${key}:`, error);
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      setLoading(true);
      try {
        const response = await axios.post(
          `${API_BASE_URL}/customer/verify?mobileNumber=${mobileNumber}&otp=${otpValue}`
        );

        const { token, customer } = response.data;

        await saveDataSecurely("jwtToken", token);
        await saveDataSecurely("customer", customer);

        setIsModalVisible(true);
        setTimeout(() => {
          setIsModalVisible(false);
          router.push("/(tabs)"); // Redirect after success
        }, 2000);
      } catch (error) {
        console.error("Error verifying OTP:", error);
        Alert.alert(
          "Verification Failed",
          "OTP is expired, timed out, or incorrect."
        );
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert("Invalid OTP", "Please enter a 6-digit OTP.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Enter OTP sent to {mobileNumber}</Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.otpInput}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(event) => handleKeyPress(event, index)}
              keyboardType="numeric"
              maxLength={1}
              autoFocus={index === 0} // Autofocus on the first input
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Verify OTP</Text>
          )}
        </TouchableOpacity>
        <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)} // Handle modal close on back press
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LottieView
              autoPlay
              ref={animation}
              style={{
                width: width * 0.8,
                height: width * 0.5,
              }}
              source={require("../../assets/anime/loading.json")}
            />

            <Text style={styles.modalText}>Loggin In</Text>
          </View>
        </View>
      </Modal>
      </View>
     
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333",
    textAlign: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.9,
    marginBottom: 24,
  },
  otpInput: {
    height: width * 0.16,
    width: width * 0.13,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    textAlign: "center",
    fontSize: width * 0.05,
    backgroundColor: "#f9f9f9",
    elevation: 2, // Shadow effect
    margin: 4,
  },
  submitButton: {
    backgroundColor: "#ff5722",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    elevation: 3, // Shadow effect
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    width: "100%",
    flex: 0, // Ensures it stays within a fixed size
    marginVertical: 10,
    paddingTop: height * 0.06,
  },
});

export default otp;
