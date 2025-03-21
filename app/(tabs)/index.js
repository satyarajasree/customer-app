import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import PagerView from "react-native-pager-view";
import SearchBar from "../components/SearchBar";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

const { width, height } = Dimensions.get("window");

const Index = () => {
  const pagerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 3; // Total number of pages
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [customer, setCustomer] = useState();

  const fetchEmployee = async () => {
    try {
      const customerData = await SecureStore.getItemAsync("customer");
      const token = await SecureStore.getItemAsync("jwtToken");
      console.log(token)
      if (customerData) {
        setCustomer(JSON.parse(customerData));
      } else {
        console.error("No employee data found");
      }
    } catch (error) {
      console.error("Error retrieving employee data:", error);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    }, 4000); // Change page every 4 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  useEffect(() => {
    if (pagerRef.current) {
      Animated.timing(animatedValue, {
        toValue: currentPage,
        duration: 500, // Slow-motion effect duration
        useNativeDriver: true,
      }).start(() => {
        pagerRef.current.setPage(currentPage);
      });
    }
  }, [currentPage]);

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
            Welcome to Rajasree Townships
          </Text>
          {customer ? (
            <>
              <Text
                style={{ fontSize: 25, fontWeight: "900", color: "darkslategrey" }}
              >
                {customer.customerName}
              </Text>
            </>
          ) : (
            <>
            <Text>No customer found</Text>
            </>
          )}

          <SearchBar />
        </View>

        <View style={styles.propertiesContainer}>
          
          <Text style={styles.availableProperties}>Available Properties</Text>

          {/* Property 1 */}
          <TouchableOpacity
            style={styles.property}
            onPress={() => router.push("/FutureGreenCity")}
          >
            <Image
              style={styles.image1}
              source={require("../../assets/images/IMG_5186.jpg")}
            />
            <Text style={styles.propertyText}>Future Green City</Text>
            <Text style={styles.propertyDescription}>
              Located in Hyderabad, offering serene living spaces surrounded by
              lush greenery.
            </Text>
          </TouchableOpacity>

          {/* Property 2 */}
          <TouchableOpacity
            style={styles.property}
            onPress={() => router.push("/SaiKeshava")}
          >
            <Image
              style={styles.image1}
              source={require("../../assets/images/IMG_5187.jpg")}
            />
            <Text style={styles.propertyText}>Sai Kesava</Text>
            <Text style={styles.propertyDescription}>
              Nestled in Vijayawada, ideal for families seeking comfort and
              modern amenities.
            </Text>
          </TouchableOpacity>
        </View>
        

        <View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>About Our Company</Text>
            <Text style={styles.infoDescription}>
              Pioneering eco-friendly housing solutions since 2013.
            </Text>
          </View>
          <PagerView
            ref={pagerRef}
            style={styles.pagerContainer}
            initialPage={0}
          >
            {/* Achievement 1 */}
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

            {/* Achievement 2 */}
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

            {/* Achievement 3 */}
            <View style={styles.page} key="3">
              <Image
                style={styles.image}
                source={require("../../assets/images/IMG_5185.jpg")}
              />
              <View style={styles.textOverlay}>
                <Text style={styles.text}>10 Years of Excellence</Text>
                <Text style={styles.subText}>
                  A decade of delivering quality real estate solutions across
                  India.
                </Text>
              </View>
            </View>
          </PagerView>
        </View>
        
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "tan",
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "tan",
  },
  welcomeContainer: {
    padding: 20,
    backgroundColor: "tan",
  },

  pagerContainer: {
    height: height / 3.5, // Limit PagerView height
    width: width, // Decrease width to 90% of screen width
    overflow: "hidden", // Ensure borderRadius works
    alignSelf: "center", // Center the PagerView
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%", // Use 100% of PagerView width
    height: height / 3.5,
    resizeMode: "cover",
  },
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
  propertiesContainer: {
    marginTop: 2,
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  availableProperties: {
    fontWeight: "bold",
    fontSize: width * 0.06,
    color: "darkslategrey",
    marginBottom: 10,
    paddingTop: width * 0.05,
  },
  property: {
    alignItems: "center",
    marginBottom: 15,
  },
  image1: {
    width: width * 0.8,
    height: height / 4,
    borderRadius: 10,
  },
  propertyText: {
    marginTop: 8,
    fontSize: width * 0.045,
    fontWeight: "600",
    color: "darkslategrey",
  },
  propertyDescription: {
    marginTop: 4,
    fontSize: width * 0.035,
    color: "gray",
    textAlign: "center",
    paddingHorizontal: 10,
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
  infoContainer: {
    padding: 10,
    backgroundColor: "white", // Semi-transparent background
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: -10, // Overlap slightly with the image for a cohesive look
  },
  infoTitle: {
    color: "black",
    fontSize: width * 0.05,
    fontWeight: "bold",
    textAlign: "center",
  },
  infoDescription: {
    color: "black",
    fontSize: width * 0.03,
    textAlign: "center",
    marginTop: 5,
  },
});
