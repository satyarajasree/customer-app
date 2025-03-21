import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  BackHandler,
  Modal,
} from "react-native";
import axios from "axios";
import { router } from "expo-router";
import { API_BASE_URL } from "../components/Api";
import { useFocusEffect } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";

const { height, width } = Dimensions.get("window");

const index = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const animation = useRef(null);

  useEffect(() => {
    animation.current?.play();
  }, []);

  const handlePhoneSubmit = async () => {
    const phoneRegex = /^[0-9]{10}$/; // Ensures exactly 10 digits
    if (!phoneRegex.test(value)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true); // Set loading before API call
    try {
      const response = await axios.post(
        `${API_BASE_URL}/customer/login?mobileNumber=${value}`
      );

      if (response.status === 200 && response.data.includes("OTP sent")) {
        setIsModalVisible(true); // Show the modal
        setTimeout(() => {
          setIsModalVisible(false);
          router.push(`/otp?mobileNumber=${value}`);
        }, 3000);
      } else {
        alert(response.data.message || "Error logging in");
      }
    } catch (error) {
      alert("Login Failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        {/* Logo here */}
      </View>
      <View style={styles.subContainer1}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Please login to your account</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Phone Number"
            value={value}
            onChangeText={setValue}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handlePhoneSubmit}
          disabled={loading}
        >
          <LinearGradient
            colors={["#B22222", "#FF6347"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.privacyContainer}>
          <Text style={styles.privacyText}>By logging in, you agree to our </Text>
          <TouchableOpacity onPress={() => router.push("/PrivacyPolicy")}>
            <Text style={styles.link}>Privacy Policy</Text>
          </TouchableOpacity>
          <Text style={styles.privacyText}> and </Text>
          <TouchableOpacity onPress={() => router.push("/TermsAndConditions")}>
            <Text style={styles.link}>Terms & Conditions</Text>
          </TouchableOpacity>
          <Text style={styles.privacyText}>.</Text>
        </View>

        <TouchableOpacity onPress={() => router.push("/Signup")}>
          <Text style={styles.signupText}>
            Don't have an account? <Text style={styles.signupLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>

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

            <Text style={styles.modalText}>Sending OTP</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "green",
  },
  logoContainer: {
    height: height / 3,
  },
  subContainer1: {
    flex: 1,
    padding: 20,
    height: height / 2,
    backgroundColor: "#f8f9fa",
    borderTopEndRadius: width * 0.1,
    borderTopLeftRadius: width * 0.1,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    color: "#0d6efd",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderColor: "#ced4da",
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#495057",
  },
  button: {
    marginTop: 10,
  },
  gradient: {
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  privacyContainer: {
    flexDirection: "row",
    marginTop: 20,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  privacyText: {
    fontSize: 14,
    color: "#6c757d",
  },
  link: {
    fontSize: 14,
    color: "#B22222",
    textDecorationLine: "underline",
  },
  signupText: {
    fontSize: 16,
    color: "#6c757d",
    marginTop: 20,
    textAlign: "center",
  },
  signupLink: {
    color: "#008B8B",
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
    flex: 0,
    marginVertical: 10,
    paddingTop: height * 0.06,
  },
});

export default index;
