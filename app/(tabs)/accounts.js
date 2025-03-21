import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as SecureStore from "expo-secure-store";
import { router } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';


const {width, height} = Dimensions.get('window')
const accounts = () => {

  const [customer, setCustomer] = useState();
    
      const fetchEmployee = async () => {
        try {
          const customerData = await SecureStore.getItemAsync("customer");
          const token = await SecureStore.getItemAsync("jwtToken");
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
  

  const handleLogout = async () => {
    try {
      // Clear session or token (example with SecureStore)
      await SecureStore.deleteItemAsync("customer");

      // Navigate to the login screen after logout
      router.push("/(login)");
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };
  return (
    <ScrollView>
      <Image style={styles.image} resizeMode="cover" source={require('../../assets/images/IMG_5184.jpg')}/>
     
      <View style={styles.divider} />
      <TouchableOpacity style={styles.buttonContainer} onPress={()=>router.push('/PrivacyPolicy')}>
        <View style={styles.box}>
        <MaterialIcons name="privacy-tip" size={30} color="blue" />
        </View>
        <View style={styles.box1}>
          <Text style={styles.buttonText}>Privacy Policy</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.divider} />
      <TouchableOpacity style={styles.buttonContainer} onPress={()=>router.push('/TermsAndConditions')}>
        <View style={styles.box}>
        <Ionicons name="document-lock" size={30} color="green" />
        </View>
        <View style={styles.box1}>
          <Text style={styles.buttonText}>Terms and Conditions</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.divider} />
      <TouchableOpacity style={styles.buttonContainer} onPress={()=>router.push('/About')}>
        <View style={styles.box}>
        <MaterialIcons name="info" size={30} color="darkslategray" />
        </View>
        <View style={styles.box1}>
          <Text style={styles.buttonText}>About us</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.divider} />
      <TouchableOpacity style={styles.buttonContainer} onPress={()=>router.push('/Support')}>
        <View style={styles.box}>
        <MaterialIcons name="support-agent" size={30} color="darkslate grey" />
        </View>
        <View style={styles.box1}>
          <Text style={styles.buttonText}>Support</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.divider} />
      <TouchableOpacity style={styles.buttonContainer} onPress={()=>router.push('logout')}>
        <View style={styles.box}>
        <MaterialIcons name="logout" size={30} color="red" />
        </View>
        <View style={styles.box1}>
          <Text style={styles.buttonText}>Logout</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default accounts

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'grey',
    justifyContent:'center',
    alignItems:'center'
  },
  image:{
    width:width * 0.8,
    height:height/4,
    borderRadius: width * 0.23, // Circular image
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#ddd",
    alignSelf:'center',
    marginTop: 10
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginVertical: 1,
    width:width*0.9,
    alignSelf:'center'
  },
  customerDetails:{
    flex:1,
    textAlign:'center',
    justifyContent:'center'
  },
  detail:{
    fontSize: 15,
    fontWeight: 'bold',
    textAlign:'center'
  }, 
  buttonContainer:{
    width: width,
    flexDirection: "row", // Aligns items in a row (horizontally)
    justifyContent: "", // Spaces items evenly
    alignItems: "center",
  },
  box:{
    backgroundColor: "",
    width: width/6,
    paddingHorizontal: 15,
    paddingVertical:20,
    marginLeft: 10,
    borderRadius: 5,
  },
  box1:{
    backgroundColor: "",
    width: width/1.4,
    margin: 5,
    borderRadius: 5,
  },
  icon:{
    width: width*0.15,
    height: height*0.1
  },
  buttonText:{
    fontSize: 20,
    fontWeight:'bold',
    color:'darkslategrey'
  }
})