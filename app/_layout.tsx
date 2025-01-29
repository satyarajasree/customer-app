import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";


export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/(tabs)");
    } else {
      router.replace("/(login)");
    }
  }, [isLoggedIn]);
  return (
    <Stack
    initialRouteName="(tabs)"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
      }}
      
    >
      <Stack.Screen name="(tabs)" options={{headerShown:false}} />
      <Stack.Screen name="(login)" options={{headerShown:false}} />
      <Stack.Screen name="index" options={{ headerShown:false }} />
      <Stack.Screen name="login" options={{ headerShown: false}}/>
      <Stack.Screen name="Signup" options={{ headerShown: false}}/>
      <Stack.Screen name="otp" options={{headerShown: false}} />
      <Stack.Screen name="PrivacyPolicy" options={{ headerShown: false}}/>
      <Stack.Screen name="TermsAndConditions" options={{ headerShown: false}}/>
      
    </Stack>
  );
}
