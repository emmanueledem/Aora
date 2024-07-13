import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

const BusyButton = ({
  text,
  containerStyles,
  textStyles,
  onpress,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onpress}
      className={`bg-secondary items-center rounded-[8px] justify-center ${containerStyles}  ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#161622" size={"large"} />
      ) : (
        <Text
          className={`text-bold px-20 py-5 text-[16px]  font-bold ${textStyles} `}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default BusyButton;
