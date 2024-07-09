import React from "react";
import { View, Text, Image } from "react-native";
import { images } from "../../constants";
import BusyButton from "./busyButton";
import { router } from "expo-router";

const EmptyState = ({ subTitle, title }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        resizeMode="contain"
        className="h-[215px] w-[270px] "
        source={images.empty}
      />
      <Text className="text-xl font-psemibold text-white text-center mt-2">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100">{subTitle}</Text>
      <BusyButton
        containerStyles={"w-full my-5"}
        onpress={() => {
          router.push("/create");
        }}
        text="Create Video"
      />
    </View>
  );
};

export default EmptyState;
