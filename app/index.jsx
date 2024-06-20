import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pblack ">Aora!</Text>
      <Link href="/home" style={{ color: "blue" }}>
        Go To Home
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}
