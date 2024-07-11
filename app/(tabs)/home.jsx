import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  Alert,
  RefreshControl,
} from "react-native";
import { useGlobalContext } from "../../context/globalprovider";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";
import SearchField from "../components/searchInput";
import Trending from "../components/trending";
import EmptyState from "../components/emptyState";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppWrite from "../../lib/useAppwrite";
import VideoCard from "../components/videoCard";

const Home = () => {
  const { data: posts, refetch } = useAppWrite(getAllPosts);
  const { data: latestPosts } = useAppWrite(getLatestPosts);
  const { user } = useGlobalContext();

  const [refreshing, SetRefreshing] = useState(false);

  const onRefresh = async () => {
    SetRefreshing(true);
    await refetch();
    SetRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6 ">
              <View>
                <Text className="font-pmedium text-white text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl text-white font-psemibold">
                  {user.username}
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
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subTitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
