import { StatusBar } from "expo-status-bar";
import { Text, View, Image, ScrollView } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import BusyButton from "./components/busyButton";
import { useGlobalContext } from "../context/globalprovider";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();
  console.log("loading is " + isLoading);
  console.log("logged in is " + isLoggedIn);
  if (!isLoading && isLoggedIn) return <Redirect href={"/home"} />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="justify-center h-full w-full items-center px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[130px] h-[84px]"
          />
          <Image
            source={images.cards}
            resizeMode="contain"
            className="max-w-[380px] w-full h-[300px]"
          />
          <View className="relative mt-5  ">
            <Text className="text-3xl text-center font-bold text-bold text-white ">
              Discover endless {"\n"} possiblilty with
              <Text className="text-secondary-200"> Aora</Text>
            </Text>
            <Image
              className="w-[130px] h-[15px] absolute -bottom-2 -right-8  "
              source={images.path}
              resizeMode="contain"
            />
          </View>
          <Text className="text-gray-100 mt-7  text-center text-1xl  ">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>
          <BusyButton
            onpress={() => {
              router.push("/sign-in");
            }}
            containerStyles="mt-7 w-full"
            text={"Continue with Email"}
          />
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622"></StatusBar>
    </SafeAreaView>
  );
}
