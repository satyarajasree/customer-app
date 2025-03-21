import React, { useRef } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import LottieView from "lottie-react-native";
const {width, height}= Dimensions.get('window')

const Support = () => {
    const animation = useRef(null);
  return (
    <View style={styles.container}>
            <LottieView
                ref={animation}
                source={require("../assets/anime/help.json")}
                autoPlay
                loop
                style={styles.lottie}
              />
        </View>
  )
}

export default Support

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  lottie: {
    width: width,
    height: height/3.5,
  },
 })