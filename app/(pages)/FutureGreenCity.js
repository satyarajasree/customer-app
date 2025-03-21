import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import * as Location from "expo-location";
import {
  router,
  useFocusEffect,
  useLocalSearchParams,
  useSearchParams,
} from "expo-router";
import AcceptancePoints from "../components/AcceptancePoints";
import AminitiesFutureGreenCity from "../components/AminitiesFutureGreenCity";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "../components/Api";

const { height, width } = Dimensions.get("window");

const FutureGreenCity = () => {
  const pagerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 3;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [accepted, setAccepted] = useState(false);
  const [signature, setSignature] = useState(null);
  const [getSignature, setGetSignature] = useState(null);
  const [loading, setLoading] = useState(true); // Added missing loading state

  // Retrieve signature param if passed from SignatureScreen
  const { signature: signatureParam } = useLocalSearchParams();
  useEffect(() => {
    if (signatureParam) {
      setSignature(signatureParam);
    }
  }, [signatureParam]);

  // Fetch EMIs
  const fetchEmis = async () => {
    try {
      const token = await SecureStore.getItemAsync("jwtToken");
      if (!token) throw new Error("Token not found");
      const formattedToken = token.replace(/^"|"$/g, "");

      const response = await fetch(`${API_BASE_URL}/customer/get-signature`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${formattedToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch EMIs");

      const data = await response.json();
      setGetSignature(data); // Update state with fetched data
      
    } catch (error) {
      console.error("Error fetching EMIs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmis();
  }, []);

  

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (pagerRef.current) {
      Animated.timing(animatedValue, {
        toValue: currentPage,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        if (pagerRef.current?.setPage) {
          pagerRef.current.setPage(currentPage);
        }
      });
    }
  }, [currentPage]);

  return (
    <ScrollView style={styles.container}>
      <PagerView ref={pagerRef} style={styles.pagerContainer} initialPage={0}>
        <View style={styles.page} key="1">
          <Image
            style={styles.image}
            source={require("../../assets/images/IMG_5187.jpg")}
          />
          <View style={styles.textOverlay}>
            <Text style={styles.text}>Award-Winning Projects</Text>
            <Text style={styles.subText}>
              Recognized for excellence in sustainable housing development.
            </Text>
          </View>
        </View>
        <View style={styles.page} key="2">
          <Image
            style={styles.image}
            source={require("../../assets/images/IMG_5184.jpg")}
          />
          <View style={styles.textOverlay}>
            <Text style={styles.text}>500+ Happy Families</Text>
            <Text style={styles.subText}>
              Trusted by families for providing dream homes with modern
              amenities.
            </Text>
          </View>
        </View>
        <View style={styles.page} key="3">
          <Image
            style={styles.image}
            source={require("../../assets/images/IMG_5185.jpg")}
          />
          <View style={styles.textOverlay}>
            <Text style={styles.text}>10 Years of Excellence</Text>
            <Text style={styles.subText}>
              A decade of delivering quality real estate solutions across India.
            </Text>
          </View>
        </View>
      </PagerView>

      <View style={styles.features}>
        <Text style={styles.heading}>Features</Text>
        <Text style={styles.featuresText}>
          We have successfully completed 9 years of glorious services by
          climbing steps day by day, month after month introducing new projects
          near by the upcoming and blooming Hyderabad and Vijayawada. Your
          investments in our projects are bound to give profits up to 200%. We
          are committed to understanding the unique needs and tailoring our
          services to exceed the expectations of the investors.
        </Text>
      </View>

      <AminitiesFutureGreenCity />
      <View style={styles.features}>
        <AcceptancePoints />
      </View>

      {getSignature?.customerSignature ? (
        <>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.availabilityButton]}
              onPress={() => router.push("/Availability")}
            >
              <Text style={styles.buttonText}>Available plots</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signaturePreview}>
            <Text style={styles.previewLabel}>Your Signature:</Text>
            <Image
              resizeMode="contain"
              style={styles.signatureImage}
              source={{ uri: getSignature.customerSignature }}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={()=>router.push('/SignatureScreen')} style={[styles.button, styles.brochureButton]}>
                <Text style={styles.buttonText}>Download Brochure</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={styles.signatureSection}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setAccepted(!accepted)}
            >
              <View
                style={[styles.checkbox, accepted && styles.checkboxChecked]}
              />
              <Text style={styles.checkboxLabel}>
                I accept the terms and conditions
              </Text>
            </TouchableOpacity>
            {accepted && !signature && (
              <TouchableOpacity
                style={styles.signatureButton}
                onPress={() =>
                  router.push({
                    pathname: "/SignatureScreen",
                    params: { returnTo: "/FutureGreenCity" },
                  })
                }
              >
                <Text style={styles.signatureButtonText}>Add Signature</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default FutureGreenCity;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  pagerContainer: {
    height: height / 3.5,
    width: width,
    overflow: "hidden",
    alignSelf: "center",
  },
  page: { justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: height / 3.5, resizeMode: "cover" },
  textOverlay: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: width * 0.05,
    fontWeight: "bold",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    textAlign: "center",
  },
  subText: {
    color: "white",
    fontSize: width * 0.03,
    fontWeight: "400",
    marginTop: 5,
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
    marginTop: 20,
  },
  button: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, width: width*0.8 },
  availabilityButton: { backgroundColor: "#4CAF50" },
  brochureButton: { backgroundColor: "#FF9800" },
  buttonText: {
    color: "white",
    fontSize: width * 0.035,
    fontWeight: "bold",
    textAlign: "center",
  },
  features: { padding: 10 },
  featuresText: {
    textAlign: "justify",
    color: "black",
    paddingTop: 10,
  },
  heading: { fontSize: 20, fontWeight: "bold", color: "darkslategray" },
  signatureSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    marginTop: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#777",
    marginRight: 10,
    borderRadius: 4,
  },
  checkboxChecked: { backgroundColor: "#4CAF50", borderColor: "#4CAF50" },
  checkboxLabel: { fontSize: 16, color: "#333" },
  signatureButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  signatureButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  signaturePreview: { marginTop: 15, alignItems: "center", paddingBottom: 10 },
  previewLabel: { fontSize: 16, marginBottom: 5 },
  signatureImage: {
    width: width * 0.8,
    height: 150,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
