import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import { PhoneNumberUtil } from "google-libphonenumber";
import { router } from "expo-router";

const { height, width } = Dimensions.get("window");
const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1"); // Default to US
  const phoneUtil = PhoneNumberUtil.getInstance();

  const handleLogin = () => {
    try {
      const parsedNumber = phoneUtil.parseAndKeepRawInput(
        phoneNumber,
        countryCode.replace("+", "")
      );
      if (phoneUtil.isValidNumber(parsedNumber)) {
        const formattedNumber = phoneUtil.format(parsedNumber, 1); // E164 format
        Alert.alert(
          "Login Successful",
          `Your phone number: ${formattedNumber}`
        );
      } else {
        Alert.alert(
          "Invalid Phone Number",
          "Please enter a valid phone number."
        );
      }
    } catch (error) {
      Alert.alert("Error", "Invalid phone number format.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.subContainer}>
        
      </View>
      <View style={styles.subContainer1}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Please login to your account</Text>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={()=>router.push('/otp')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.privacyContainer}>
          <Text style={styles.privacyText}>
            By logging in, you agree to our{" "}
          </Text>
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
            Don't have an account?{" "}
            <Text style={styles.signupLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "green",
  },
  subContainer: {
    flex: 1,
    height: height / 4.5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: width * 0.1,
    fontWeight: "bold",
    color: "green",
  },
  subContainer1: {
    flexGrow: 1,
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
  picker: {
    height: 50,
    borderColor: "#ced4da",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderColor: "#ced4da",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#495057",
  },
  button: {
    backgroundColor: "#B22222",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
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
});

export default Login;
