import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";


const {width, height} = Dimensions.get('window')

const About = () => {
  return (
    <View style={styles.container}>
        <Image source={require('../assets/images/4535151.jpg')} style={styles.image}/>
      <Text style={styles.text}>
        We have successfully completed 9 years of glorious services by climbing
        steps day by day, month after month introducing new projects near by the
        upcoming and blooming Hyderabad and Vijayawada. Your investments in our
        projects are bound to give profits up to 200%. We are committed to
        understanding the unique needs and tailoring our services to exceed the
        expectations of the investors.
      </Text>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    text:{
        fontSize: 15,
        textAlign:'justify',
        padding: 10,
    },
    image:{
        width: width,
        height:height/4,
        borderRadius: 12
    }
})