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
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { router } from "expo-router";

const { height, width } = Dimensions.get("window");

const SaiKeshava = () => {
  const pagerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 3; // Total number of pages
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
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
    <ScrollView style={styles.container}>
      {/* PagerView Section */}
      <PagerView ref={pagerRef} style={styles.pagerContainer} initialPage={0}>
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
              A decade of delivering quality real estate solutions across India.
            </Text>
          </View>
        </View>
      </PagerView>

      {/* Buttons Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.availabilityButton]} onPress={()=>router.push('/SaiKeshavaAvailablePlots')}>
          <Text style={styles.buttonText}>Availability</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.brochureButton]}>
          <Text style={styles.buttonText}>Download Brochure</Text>
        </TouchableOpacity>
      </View>

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

      <View style={styles.features}>
        <Text style={styles.heading}>Aminities</Text>
        <Text style={styles.featuresText}>
          ➡ We have successfully completed 9 years of glorious services by
          climbing steps day by day
        </Text>
        <Text style={styles.featuresText}>
          ➡ We have successfully completed 9 years of glorious services by
          climbing steps day by day
        </Text>
        <Text style={styles.featuresText}>
          ➡ We have successfully completed 9 years of glorious services by
          climbing steps day by day
        </Text>
        <Text style={styles.featuresText}>
          ➡ We have successfully completed 9 years of glorious services by
          climbing steps day by day
        </Text>
        <Text style={styles.featuresText}>
          ➡ We have successfully completed 9 years of glorious services by
          climbing steps day by day
        </Text>
      </View>

      <View style={styles.features}>
        <Text style={styles.heading}>Terms and Conditions</Text>
        <Text style={styles.featuresText}>
          ► We have successfully completed 9 years of glorious services by
          climbing steps day by day
        </Text>
        <Text style={styles.featuresText}>
          ► We have successfully completed 9 years of glorious services by
          climbing steps day by day
        </Text>
        <Text style={styles.featuresText}>
          ► We have successfully completed 9 years of glorious services by
          climbing steps day by day
        </Text>
        <Text style={styles.featuresText}>
          ► We have successfully completed 9 years of glorious services by
          climbing steps day by day
        </Text>
        <Text style={styles.featuresText}>
          ► We have successfully completed 9 years of glorious services by
          climbing steps day by day
        </Text>
      </View>

      <View style={{ flex: 1 }}>
  {errorMsg ? (
    <Text>{errorMsg}</Text>
  ) : location ? (
    <MapView
      style={styles.map}
      region={{
        latitude: 17.385044,
        longitude: 78.486671,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker coordinate={{ latitude: 17.385044, longitude: 78.486671 }} />
    </MapView>
  ) : (
    <MapView
      style={styles.map}
      region={{
        latitude: 17.385044,
        longitude: 78.486671,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker coordinate={{ latitude: 17.385044, longitude: 78.486671 }} />
    </MapView>
  )}
</View>

    </ScrollView>
  );
};

export default SaiKeshava;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  pagerContainer: {
    height: height / 3.5, // Limit PagerView height
    width: width, // Full screen width
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
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  availabilityButton: {
    backgroundColor: "#4CAF50", // Green color for Availability
  },
  brochureButton: {
    backgroundColor: "#FF9800", // Orange color for Download Brochure
  },
  buttonText: {
    color: "white",
    fontSize: width * 0.035,
    fontWeight: "bold",
    textAlign: "center",
  },
  features: {
    padding: 20,
  },
  featuresText: {
    textAlign: "justify",
    color: "black",
    paddingTop: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "darkslategray",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginVertical: 1,
    width: width * 0.9,
    alignSelf: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
