import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, Image, View } from "react-native";
import { icons } from "../../constants";

const FormField = ({
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
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 flex-row rounded-2xl focus:border-secondary item-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChange={handleChangeText}
          secureTextEntry={title === "Password" && !showPasswod}
        />

        {title == "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPasswod)}>
            <Image
              source={!showPasswod ? icons.eye : icons.eyeHide}
              className="w-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
