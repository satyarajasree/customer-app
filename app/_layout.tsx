import { Stack } from "expo-router";


export default function RootLayout() {
  return (
    <Stack
    initialRouteName="(tabs)"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
      }}
      
    >
      <Stack.Screen name="(tabs)" options={{headerShown:false}} />
      <Stack.Screen name="index" options={{ headerShown:false }} />
      <Stack.Screen name="login" options={{ headerShown: false}}/>
      <Stack.Screen name="Signup" options={{ headerShown: false}}/>
      <Stack.Screen name="otp" options={{headerShown: false}} />
      <Stack.Screen name="PrivacyPolicy" options={{ headerShown: false}}/>
      <Stack.Screen name="TermsAndConditions" options={{ headerShown: false}}/>
      
    </Stack>
  );
}
