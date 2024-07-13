import React from "react";
import { View, Text } from "react-native";

const InfoBox = ({ totalPosts, totalViews }) => {
  return (
    <View className="flex-row space-x-10 mt-7">
      <View className="items-center">
        <Text className="font-bold text-white text-2xl">{totalPosts}</Text>
        <Text className="font-pregular text-gray-100 text-sm">Posts</Text>
      </View>
      <View className="items-center">
        <Text className="font-bold text-white text-2xl">{totalViews}</Text>
        <Text className="font-pregular text-gray-100 text-sm">Views</Text>
      </View>
    </View>
  );
};

export default InfoBox;
