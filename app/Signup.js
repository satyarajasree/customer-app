import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios"; // Import axios
import { API_BASE_URL } from "./components/Api";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

const SignUpForm = () => {
  const [form, setForm] = useState({
    customerName: "",
    fatherName: "",
    dateOfBirth: "",
    age: "",
    aadharNumber: "",
    mobileNumber: "",
    email: "",
    city: "",
    pincode: "",
    groupName: "",
    panNumber: "",
    primaryAddress: "",
    nomineeName: "",
    occupation: "",
    employeeId: "",
  });

  const [profileImage, setProfileImage] = useState(null); // Store selected image

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  // Image Picker Function
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0]); // Store selected image
    }
  };

  const handleSubmit = async () => {
    const {
      customerName,
      fatherName,
      dateOfBirth,
      age,
      aadharNumber,
      mobileNumber,
      email,
      city,
      pincode,
      groupName,
      panNumber,
      primaryAddress,
      nomineeName,
      occupation,
      employeeId,
    } = form;

    if (
      !customerName ||
      !aadharNumber ||
      !mobileNumber ||
      !email ||
      !panNumber
    ) {
      Alert.alert("Validation Error", "Please fill all the required fields.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.match(emailPattern)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }

    if (mobileNumber.length !== 10) {
      Alert.alert(
        "Validation Error",
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    const formData = new FormData();
    formData.append("customerName", customerName);
    formData.append("fatherName", fatherName);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("age", age);
    formData.append("aadharNumber", aadharNumber);
    formData.append("mobileNumber", mobileNumber);
    formData.append("email", email);
    formData.append("city", city);
    formData.append("pincode", pincode);
    formData.append("groupName", groupName);
    formData.append("panNumber", panNumber);
    formData.append("primaryAddress", primaryAddress);
    formData.append("nomineeName", nomineeName);
    formData.append("occupation", occupation);
    formData.append("employeeId", employeeId);
    formData.append("status", "false");

    // Append Profile Image if Selected
    if (profileImage) {
      formData.append("profileImage", {
        uri: profileImage.uri,
        name: "profile.jpg",
        type: "image/jpeg",
      });
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/customer/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        Alert.alert("Success", "Customer registered successfully!");
        router.push("/(login)");
      } else if (response.status === 409) {
        Alert.alert("Error", "Customer already exists.");
      } else if (response.status === 404) {
        Alert.alert("Error", "Employee not found.");
      } else {
        Alert.alert("Error", "Failed to register customer.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      Alert.alert(
        "Error",
        "Failed to register. Please check your details and try again."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Create Your Account</Text>

        {/* Customer Name */}
        <TextInput
          style={styles.input}
          placeholder="Customer Name"
          value={form.customerName}
          onChangeText={(value) => handleChange("customerName", value)}
        />

        {/* Father's Name */}
        <TextInput
          style={styles.input}
          placeholder="Father/Guardian's Name"
          value={form.fatherName}
          onChangeText={(value) => handleChange("fatherName", value)}
        />

        {/* Date of Birth */}
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={form.dateOfBirth}
          onChangeText={(value) => handleChange("dateOfBirth", value)}
        />

        {/* Age */}
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter your age"
          value={form.age}
          onChangeText={(value) => handleChange("age", value)}
        />

        {/* Aadhar Number */}
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={12}
          placeholder="Aadhar Number (12 digits)"
          value={form.aadharNumber}
          onChangeText={(value) => handleChange("aadharNumber", value)}
        />

        {/* Mobile Number */}
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          placeholder="Mobile Number"
          value={form.mobileNumber}
          onChangeText={(value) => handleChange("mobileNumber", value)}
        />

        {/* Email */}
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Email Address"
          value={form.email}
          onChangeText={(value) => handleChange("email", value)}
        />

        {/* City */}
        <TextInput
          style={styles.input}
          placeholder="City"
          value={form.city}
          onChangeText={(value) => handleChange("city", value)}
        />

        {/* Pincode */}
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Pincode"
          value={form.pincode}
          onChangeText={(value) => handleChange("pincode", value)}
        />

<View style={styles.pickerContainer}>
  <Picker
    selectedValue={form.groupName}
    onValueChange={(itemValue) => handleChange("groupName", itemValue)}
    style={styles.picker}
  >
    <Picker.Item label="Select Group Name" value="" />
    <Picker.Item label="Future Green City" value="FUTURE_GREEN_CITY" />
    <Picker.Item label="Sai Keshava" value="SAI_KESHAVA" />
    
    {/* Add more group names dynamically if needed */}
  </Picker>
</View>

        {/* PAN Number */}
        <TextInput
          style={styles.input}
          placeholder="PAN Number"
          value={form.panNumber}
          onChangeText={(value) => handleChange("panNumber", value)}
        />

        {/* Primary Address */}
        <TextInput
          style={styles.input}
          placeholder="Primary Address"
          value={form.primaryAddress}
          onChangeText={(value) => handleChange("primaryAddress", value)}
        />

        {/* Nominee Name */}
        <TextInput
          style={styles.input}
          placeholder="Nominee Name"
          value={form.nomineeName}
          onChangeText={(value) => handleChange("nomineeName", value)}
        />

        {/* Occupation */}
        <TextInput
          style={styles.input}
          placeholder="Occupation"
          value={form.occupation}
          onChangeText={(value) => handleChange("occupation", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Employee Reference Id"
          value={form.employeeId}
          onChangeText={(value) => handleChange("employeeId", value)}
        />

        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          {form.profileImage ? (
            <Image
              source={{ uri: form.profileImage }}
              style={styles.profileImage}
            />
          ) : (
            <Text style={styles.imagePlaceholder}>
              Tap to select a profile image {form.profileImage}
            </Text>
          )}
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  scrollView: {
    paddingBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#B22222",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: "#B22222",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "grey",
    padding: 12,
    borderRadius: 20
  },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  imagePlaceholder: { color: "white" },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "white",
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default SignUpForm;
