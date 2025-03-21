import { router } from "expo-router";
import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import PagerView from "react-native-pager-view";
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get("window");

export default function Index() {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef(null); // Create a ref for PagerView
  const animation = useRef(null);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    animation.current?.play();
  }, []);

  const handleNext = () => {
    if (currentPage < 3) {
      pagerRef.current.setPage(currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      pagerRef.current.setPage(currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <View style={styles.container}>
      <PagerView style={styles.pagerView} initialPage={0} ref={pagerRef}>
        <View style={styles.page1} key="1">
          <Text style={styles.title1} allowFontScaling={false}>
            𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐭𝐨 𝐑𝐚𝐣𝐚𝐬𝐫𝐞𝐞 𝐓𝐨𝐰𝐧𝐬𝐡𝐢𝐩𝐬
          </Text>
          <Image
            source={require("../assets/images/app.png")}
            style={{
              width: width * 0.9,
              height: height / 3,
              borderRadius: width * 0.2,
              marginTop: width * 0.1,
            }}
          />
        </View>
        {/* First Page */}
        <View style={styles.page} key="2">
          <Text style={styles.title} allowFontScaling={false}>
            𝑴𝒂𝒌𝒆 𝒉𝒂𝒔𝒔𝒍𝒆-𝒇𝒓𝒆𝒆 𝒐𝒏𝒍𝒊𝒏𝒆 𝒑𝒂𝒚𝒎𝒆𝒏𝒕𝒔 𝒅𝒊𝒓𝒆𝒄𝒕𝒍𝒚 𝒇𝒓𝒐𝒎 𝒕𝒉𝒆 𝒂𝒑𝒑, 𝒂𝒏𝒚𝒕𝒊𝒎𝒆,
            𝒂𝒏𝒚𝒘𝒉𝒆𝒓𝒆!
          </Text>
          <Text style={styles.description} allowFontScaling={false}></Text>
          <Image
            source={require("../assets/images/payement.jpg")}
            style={{ width: width, height: height / 2 }}
          />
        </View>

        {/* Second Page */}
        <View style={styles.page1} key="3">
          <Text style={styles.title} allowFontScaling={false}>
            𝑬𝒂𝒔𝒊𝒍𝒚 𝒂𝒄𝒄𝒆𝒔𝒔 𝒂𝒍𝒍 𝒚𝒐𝒖𝒓 𝒑𝒂𝒚𝒎𝒆𝒏𝒕𝒔 𝒂𝒏𝒅 𝒊𝒎𝒑𝒐𝒓𝒕𝒂𝒏𝒕 𝒅𝒐𝒄𝒖𝒎𝒆𝒏𝒕𝒔 𝒂𝒏𝒚𝒕𝒊𝒎𝒆,
            𝒓𝒊𝒈𝒉𝒕 𝒇𝒓𝒐𝒎 𝒕𝒉𝒆 𝒂𝒑𝒑!
          </Text>
          
          <Image
            source={require("../assets/images/dashboard.jpg")}
            style={{ width: width, height: height / 2 }}
          />
        </View>

        {/* Third Page */}
        <View style={styles.page2} key="4">
          <Text style={styles.title} allowFontScaling={false}>
            Get Started
          </Text>
          <Text style={styles.description} allowFontScaling={false}>
            You're ready to start your journey with us!
          </Text>
          <LottieView
        autoPlay
        ref={animation}
        style={{
          width: width,
          height: height*0.6,
          backgroundColor: 'white',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../assets/anime/start.json')}
      />
        </View>
      </PagerView>

      {/* Navigation Buttons */}
      <View style={styles.navigation}>
        {currentPage < 3 ? (
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/(login)")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: width * 0.05,
  },
  page1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: width * 0.05,
  },
  page2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: width * 0.05,
  },
  title: {
    fontSize: width * 0.065,
    fontWeight: "400",
    marginBottom: height * 0.02,
    textAlign: "center",
    color: 'orange'
  },
  title1: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    marginBottom: height * 0.02,
    textAlign: "center",
    color:'green'
  },
  description: {
    fontSize: width * 0.05,
    color: "#555",
    marginBottom: height * 0.03,
    textAlign: "center",
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#87CEFA",
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    borderRadius: width * 0.02,
    width: width * 0.9,
    borderRadius: width * 0.9,
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "bold",
    textAlign: "center",
  },
});
