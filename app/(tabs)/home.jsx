import React from "react";
import { View, Text, Image, TextInput, FlatList } from "react-native";
import { useGlobalContext } from "../../context/globalprovider";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";
import SearchField from "../components/searchInput";
import Trending from "../components/trending";
import EmptyState from "../components/emptyState";

const Home = () => {
  const { user } = useGlobalContext();
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text className="text-white">{item.id}</Text>}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6 ">
              <View>
                <Text className="font-pmedium text-white text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl text-white font-psemibold">
                  {user.name}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  className="w-9 h-10"
                  resizeMode="contain"
                  source={images.logoSmall}
                />
              </View>
            </View>
            <SearchField />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>
              <Trending
                posts={
                  [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }] ?? []
                }
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subTitle="Be the first one to upload a video"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
