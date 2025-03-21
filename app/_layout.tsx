import { router, Stack } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { View, ActivityIndicator, StyleSheet } from "react-native";

// Prevent the splash screen from auto-hiding.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);

  // Check token function
  const checkToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("customer");
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error checking token:", error);
      setIsLoggedIn(false);
    }
  };

  // Perform async setup (e.g., token checking)
  useEffect(() => {
    async function prepare() {
      await checkToken();
      // If you have other resources (fonts, API calls), load them here.
      setAppIsReady(true);
    }
    prepare();
  }, []);

  // Navigate when token checking is complete and app is ready.
  useEffect(() => {
    if (appIsReady) {
      if (isLoggedIn) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(login)");
      }
    }
  }, [isLoggedIn, appIsReady]);

  // onLayout callback to hide splash screen once the root view is ready.
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // Show a loading indicator until the app is ready.
  if (!appIsReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#B22222" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      
      <Stack
        initialRouteName="(login)"
        screenOptions={{
          headerShown: true,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="(pages)/FutureGreenCity"
          options={{ headerShown: true, headerTitle: "Future Green City" }}
        />
        <Stack.Screen
          name="(pages)/MyPropertyDetails"
          options={{ headerShown: true, headerTitle: "Future Green City" }}
        />
        <Stack.Screen
          name="(pages)/SaiKeshava"
          options={{ headerShown: true, headerTitle: "Sai Keshava" }}
        />
        <Stack.Screen
          name="(pages)/Availability"
          options={{ headerShown: true, headerTitle: "Future Green City" }}
        />
        <Stack.Screen
          name="(pages)/SaiKeshavaAvailablePlots"
          options={{ headerShown: true, headerTitle: "Sai Keshava" }}
        />
        <Stack.Screen
          name="(pages)/PlotsView"
          options={{ headerShown: true, headerTitle: "Plots View" }}
        />
        <Stack.Screen
          name="(pages)/SaiKeshavaPlotsView"
          options={{ headerShown: true, headerTitle: "Plots View" }}
        />
         <Stack.Screen
          name="(pages)/SignatureScreen"
          options={{ headerShown: true, headerTitle: "Add Signature" }}
        />
        <Stack.Screen name="(login)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Signup" options={{ headerShown: false }} />
        <Stack.Screen
          name="PrivacyPolicy"
          options={{ headerShown: true, headerTitle: "Privacy Policy" }}
        />
        <Stack.Screen
          name="TermsAndConditions"
          options={{ headerShown: true, headerTitle: "Terms and Conditions" }}
        />
        <Stack.Screen
          name="EditProfileScreen"
          options={{ headerShown: true, headerTitle: "Edit Profile" }}
        />
        <Stack.Screen
          name="projectDetails"
          options={{ headerShown: true, headerTitle: "Project Details" }}
        />
        <Stack.Screen
          name="About"
          options={{ headerShown: true, headerTitle: "About us" }}
        />
         <Stack.Screen name="logout" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
