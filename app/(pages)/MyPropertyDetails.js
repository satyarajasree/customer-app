import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "../components/Api";
import { Table, Row, Rows } from "react-native-table-component";

const { width, height } = Dimensions.get("window");

const MyPropertyDetails = () => {
  const route = useRouter();
  const { id } = useLocalSearchParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const getToken = async () => {
    try {
      return await SecureStore.getItemAsync("jwtToken");
    } catch (error) {
      console.error("Error getting token", error);
      return null;
    }
  };

  const fetchPropertyDetails = async () => {
    try {
      const token = await getToken();
      if (!token) {
        console.error("JWT Token not found!");
        return;
      }

      const formattedToken = token.replace(/^"|"$/g, "");

      const response = await fetch(
        `${API_BASE_URL}/customer/customer-property/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${formattedToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch property details");
      }

      const data = await response.json();
      setProperty(data);
    } catch (error) {
      console.error("Error fetching property details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPropertyDetails();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/IMG_5184.jpg")}
        style={styles.image}
      >
        <View style={styles.overlay}>
          <Text style={styles.imageText}>{property?.customer?.groupName}</Text>
        </View>
      </ImageBackground>
      <View style={styles.tableContainer}>
        <Text style={styles.title}>Plot Details</Text>
        <Table borderStyle={{ borderWidth: 1, borderColor: "#000" }}>
          <Row
            data={["Customer Name", property?.customer?.customerName]}
            style={styles.row}
            textStyle={styles.text}
          />
          <Row
            data={["Property Name", property?.plots.area.groupName]}
            style={styles.row}
            textStyle={styles.text}
          />
          <Row
            data={["Plot Number", property?.plots?.plotNumber]}
            style={styles.row}
            textStyle={styles.text}
          />

          <Row
            data={["Plot Area", property?.plots.area.area]}
            style={styles.row}
            textStyle={styles.text}
          />
          <Row
            data={["Passbook", property?.passbook]}
            style={styles.row}
            textStyle={styles.text}
          />
          <Row
            data={["Phase", property?.plots.phase]}
            style={styles.row}
            textStyle={styles.text}
          />
          <Row
            data={[
              "Booking Date",
              property?.purchaseDate
                ? new Date(property.purchaseDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "N/A",
            ]}
            style={styles.row}
            textStyle={styles.text}
          />

          <Row
            data={[
              "Plot Amount",
              property?.plots?.plotAmount
                ? `₹${Math.round(property?.plots?.plotAmount)}`
                : "",
            ]}
            style={styles.row}
            textStyle={styles.text}
          />
          <Row
            data={[
              "Paid Amount",
              property?.amountPaid
                ? `₹${Math.round(property?.amountPaid)}`
                : "",
            ]}
            style={styles.row}
            textStyle={styles.text}
          />
          <Row
            data={[
              "Remaining Amount",
              property?.remainingAmount
                ? `₹${Math.round(property?.remainingAmount)}`
                : "",
            ]}
            style={styles.row}
            textStyle={styles.text}
          />
          <Row
            data={[
              "EMI Amount",
              property?.emiAmount ? `₹${Math.round(property?.emiAmount)}` : "",
            ]}
            style={styles.row}
            textStyle={styles.text}
          />
        </Table>

        <Text style={styles.title}>EMI Details</Text>
        <Table borderStyle={{ borderWidth: 1, borderColor: "#000" }}>
          <Row
            data={["Month", "EMI Date", "Amount", "Paid"]}
            style={styles.header}
            textStyle={styles.headerText}
          />
          <Rows
            data={property?.emiList?.map((emi) => [
              emi.emiMonthName,
              emi.emiDate,
              `₹${Math.round(emi.emiAmount)}`,
              <View
                style={[
                  styles.status,
                  { backgroundColor: emi.paid ? "green" : "red" },
                ]}
              >
                <Text style={[styles.emiStatus, { color: "white" }]}>
                  {emi.paid ? "Paid" : "Pending"}
                </Text>
              </View>,
            ])}
            textStyle={styles.text}
          />
        </Table>
      </View>
    </ScrollView>
  );
};

export default MyPropertyDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "snow",
  },
  image: {
    width: width,
    height: height / 4,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  imageText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableContainer: {
    padding: 10,
  },
  title: {
    fontSize: width * 0.05,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 10,
  },
  row: {
    height: 40,
    backgroundColor: "#f8f8f8",
  },
  header: {
    height: 50,
    backgroundColor: "#4CAF50",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 14,
  },
  emiStatus: {
    fontWeight: "bold",
    textAlign: "center",
  },
  status: {
    margin: width * 0.02,
    borderRadius: width * 1,
    padding: width * 0.01,
  },
});
