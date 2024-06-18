import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { Slot, Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: true }} />
    </Stack>
  );
};

export default RootLayout;