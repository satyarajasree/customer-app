import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const EmiCard = ({ emi, onPay }) => {
  const handleDownloadInvoice = async () => {
    try {
      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .invoice-container { max-width: 700px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; }
              .header { text-align: center; margin-bottom: 20px; }
              .header h2 { margin: 5px 0; color: green; }
              .invoice-details { width: 100%; border-collapse: collapse; margin-top: 20px; }
              .invoice-details th, .invoice-details td { border: 1px solid #ddd; padding: 10px; text-align: left; }
              .invoice-details th { background-color: #f2f2f2; font-weight: bold; }
              .total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="invoice-container">
              <div class="header">
                <h2>Rajasree Townships</h2>
                <p>123 Street, City, State, Zip</p>
                <p>Phone: +91-XXXXXXXXXX | Email: support@company.com</p>
              </div>
              
              <h3 style="text-align: center;">EMI Invoice</h3>
  
              <table class="invoice-details">
                <tr>
                  <th>EMI Month</th>
                  <td>${emi.emiMonth}</td>
                </tr>
                <tr>
                  <th>Customer Name</th>
                  <td>${emi.customer}</td>
                </tr>
                <tr>
                  <th>Passbook No</th>
                  <td>${emi.passbook}</td>
                </tr>
                <tr>
                  <th>Project Name</th>
                  <td>${emi.groupName}</td>
                </tr>
                <tr>
                  <th>Amount</th>
                  <td>₹${emi.emiAmount}</td>
                </tr>
                <tr>
                  <th>Due Date</th>
                  <td>${new Date(emi.emiDate).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td style="color: ${emi.isPaid ? "green" : "red"}; font-weight: bold;">${emi.isPaid ? "Paid" : "Unpaid"}</td>
                </tr>
              </table>
  
              <p class="total">Total Amount: ₹${Math.round(emi.emiAmount)}</p>
  
            </div>
          </body>
        </html>
      `;
  
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
  
      if (uri) {
        Alert.alert("Invoice Generated", "Invoice is ready!", [
          { text: "Open", onPress: () => Sharing.shareAsync(uri) },
          { text: "OK" },
        ]);
      }
    } catch (error) {
      console.error("Error generating invoice:", error);
      Alert.alert("Error", "Failed to generate invoice.");
    }
  };
  

  return (
    <View style={styles.card}>
      <Text style={{ fontWeight: '900', fontSize: width * 0.05, color: 'green' }}>
        {emi.emiMonth} EMI
      </Text>
      <Text style={styles.text}>Customer: {emi.customer}</Text>
      <Text style={styles.text}>Passbook: {emi.passbook}</Text>
      <Text style={styles.text}>Project: {emi.groupName}</Text>
      <Text style={styles.text}>Amount: ₹{Math.round(emi.emiAmount)}</Text>
      <Text style={styles.text}>Date: {new Date(emi.emiDate).toLocaleDateString()}</Text>

      {!emi.isPaid && onPay && (
        <TouchableOpacity onPress={() => onPay(emi.emiId)}>
          <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Pay</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={handleDownloadInvoice}>
        <LinearGradient
          colors={['#28a745', '#218838']}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Download Invoice</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EmiCard;
