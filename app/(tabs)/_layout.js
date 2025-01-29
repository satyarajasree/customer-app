import { router, Tabs } from 'expo-router';
import React from 'react';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const _layout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: "red",
      tabBarInactiveTintColor: "black",
      headerShown: true,
      headerTintColor: "black",
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={() => router.push('/accounts')} // Logout directly on press of the logout button
            style={{ marginRight: 15 }}
          >
            <FontAwesome name="user" size={24} color="black" />
          </TouchableOpacity>
        );
      },

    }}>
      <Tabs.Screen name='index' options={{
        headerTitle: 'Home', title: 'Home', tabBarIcon: ({ color }) => (
          <FontAwesome name="home" size={25} color={color} />
        ),
      }} />
     
      
      <Tabs.Screen name='myProperties' options={{
        headerTitle: 'My Properties', title: 'My Properties', tabBarIcon: ({ color }) => (

          <MaterialIcons name="my-library-add" size={24} color={color} />
        ),
      }} />
      <Tabs.Screen name='billings' options={{
        headerTitle: 'Billings', title: 'Billings', tabBarIcon: ({ color }) => (

          <FontAwesome5 name="money-bill" size={24} color={color} />
        ),
      }} />
       <Tabs.Screen name='accounts' options={{
        headerTitle: 'Accounts', title: 'Accounts', tabBarIcon: ({ color }) => (

          <FontAwesome name="user" size={24} color={color} />
        ),
      }} />
    </Tabs>
  );
};

export default _layout;
