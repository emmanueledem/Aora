import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View,
  Alert,
} from "react-native";
import { icons } from "../../constants";
import { router, usePathname } from "expo-router";

const SearchField = ({ initialQuery }) => {
  const pathName = usePathname();
  const [query, SetQuery] = useState(initialQuery || "");

  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 flex-row rounded-2xl focus:border-secondary item-center space-y-5">
      <TextInput
        className="text-white mt-0.5 flex-1 text-base font-pregular"
        value={query}
        autoCapitalize="none"
        placeholder="Search for a video topic"
        placeholderTextColor="#cdcde0"
        onChangeText={(e) => SetQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "please insert something to search result accross database"
            );
          }
          if (pathName.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchField;
