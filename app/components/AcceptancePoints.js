import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";


const {width, height} = Dimensions.get('window');
const AcceptancePoints = () => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#117a65", "black"]} style={styles.background} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.header}>Acceptance of Terms</Text>
        <Text style={styles.paragraph}>
          By accessing and using the Rajasree Townships app, I agree to be bound by the Terms and Conditions. If you don’t agree, please refrain from using the website/app.
        </Text>
        <Text style={styles.header}>Plot Area & Pricing</Text>
        <Text style={styles.paragraph}>
          The area of the plot in Guntas is approximately:
        </Text>
        <Text style={styles.subParagraph}>
          - 605 Sq.yards (5 Guntas)
        </Text>
        <Text style={styles.subParagraph}>
          - 1210 Sq.yards (10 Guntas)
        </Text>
        <Text style={styles.paragraph}>
          Per Gunta without EMI, it costs Rs 3,00,000/- and with EMI per Gunta it costs Rs 3,50,000/-.
        </Text>
        <Text style={styles.header}>Farm Land Pricing</Text>
        <Text style={styles.paragraph}>
          Farm Land per Acre costs Rs 45,00,000/-. For booking, Rs. 5,00,000/- per acre should be paid.
        </Text>
        <Text style={styles.header}>Agreement Payment</Text>
        <Text style={styles.paragraph}>
          For each agreement, 30% of the property value is to be paid.
        </Text>
      </ScrollView>
    </View>
  );
};

export default AcceptancePoints;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 20,
    borderRadius: 20
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "tomato",
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
    color: "white",
  },
  subParagraph: {
    fontSize: 16,
    marginLeft: 15,
    marginBottom: 10,
    color: "grey",
  },
  
});
