import { router, Tabs } from "expo-router";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const { width, height } = Dimensions.get("window");

const _layout = () => {
  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "black",
          tabBarActiveBackgroundColor: "tan",
          headerShown: true,
          tabBarStyle: styles.tabBarStyle,
          headerStyle: styles.headerStyle,
          headerTintColor: "black",
          headerTitle:'Rajasree Townships',
          headerTitleStyle:{
            color:'green',
            fontWeight:'bold'
          },

          headerRight: () => {
            return (
              <>
               <TouchableOpacity
                onPress={()=>router.push('/Notifications')}
                style={{ marginRight: 15 }}
              >
                <FontAwesome name="bell" size={20} color="orange" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/EditProfileScreen")} // Logout directly on press of the logout button
                style={{ marginRight: 15 }}
              >
                <FontAwesome name="user" size={24} color="darkslategrey" />
              </TouchableOpacity>
              </>
            );
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            
            title: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="home" size={25} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="myProperties"
          options={{
            
            title: "My Properties",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="my-library-add" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="billings"
          options={{
            
            title: "Billings",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="money-bill" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="accounts"
          options={{
            title: "Account",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default _layout;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: height * 0.07, // Adjust height of tabs
    backgroundColor: "#F8F8F8", // Default background color
  },
  headerStyle: {
    backgroundColor: "white", // Header background color
    height: height*0.07, // Reduce the header height
  },
});

