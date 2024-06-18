import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    PoppinsBlack: require("../assets/fonts/Poppins-Black.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsExtraBold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    PoppinsExtraLight: require("../assets/fonts/Poppins-ExtraLight.ttf"),
    PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsThin: require("../assets/fonts/Poppins-Thin.ttf"),
  });

  // useEffect(() => {
  //   if (error) throw error;
  //   if (fontsLoaded) throw SplashScreen.hideAsync();
  // }, [fontsLoaded, error]);

  // if (!fontsLoaded && !error) throw error;

  if (!fontsLoaded && !error) {
    return (
      <View>
        <Text>loading fonts</Text>
      </View>
    );
  } else {
    SplashScreen.hideAsync();
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: true }} />
    </Stack>
  );
};

export default RootLayout;
