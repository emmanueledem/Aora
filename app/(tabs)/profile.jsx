import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/globalprovider";
import EmptyState from "../components/emptyState";
import useAppWrite from "../../lib/useAppwrite";
import { getAllMyPosts, logOut } from "../../lib/appwrite";
import VideoCard from "../components/videoCard";
import { router } from "expo-router";
import InfoBox from "../components/infoBox";

function Profile() {
  const { user, SetUser, SetIsLoggedIn } = useGlobalContext();
  const { data: posts } = useAppWrite(() => getAllMyPosts(user.$id));

  const logout = async () => {
    await logOut();
    SetUser(null);
    SetIsLoggedIn(false);
    router.replace("/sign-in");
  };
  return (
    <SafeAreaView className="bg-primary h-full px-4 py-4 ">
      <View className="flex-row justify-end">
        <TouchableOpacity activeOpacity={0.9} onPress={logout}>
          <Image
            source={icons.logout}
            resizeMode="contain"
            className="h-6 w-6"
          />
        </TouchableOpacity>
      </View>
      <View className="items-center justify-center mb-5">
        <View className="border border-secondary border-4 rounded-lg justify-center items-center w-[70px]  h-[70px] p-0.5 ">
          <Image
            resizeMode="cover"
            className="w-[90%] h-[90%] rounded-lg"
            source={{ uri: user?.avatar }}
          />
        </View>
        <Text className="mt-3 text-white text-center font-bold text-[30px] ">
          {user?.username}
        </Text>
        <InfoBox totalPosts={posts.length || 0} totalViews={`1.2k`} />
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subTitle="Be the first one to upload a video"
          />
        )}
      />
    </SafeAreaView>
  );
}

export default Profile;
