import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, Image, View } from "react-native";
import { icons } from "../../constants";

const SearchField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
  ...props
}) => {
  const [showPasswod, setShowPassword] = useState(false);
  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 flex-row rounded-2xl focus:border-secondary item-center space-y-5">
      <TextInput
        className="text-white mt-0.5 flex-1 text-base font-pregular"
        value={value}
        autoCapitalize="none"
        keyboardType={keyboardType}
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPasswod}
      />

      <TouchableOpacity onPress={() => setShowPassword(!showPasswod)}>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchField;
