import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppWrite from "../../lib/useAppwrite";
import { searchPosts } from "../../lib/appwrite";

import { useGlobalContext } from "../../context/globalprovider";
import SearchField from "../components/searchInput";
import EmptyState from "../components/emptyState";
import VideoCard from "../components/videoCard";

function Search() {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppWrite(() => searchPosts(query));

  console.log(query, posts);

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-white text-sm text-gray-100">
              Search Result
            </Text>
            <Text className="text-2xl text-white font-psemibold">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchField initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found for this search query"
            subTitle="Be the first one to upload a video"
          />
        )}
      />
    </SafeAreaView>
  );
}

export default Search;
