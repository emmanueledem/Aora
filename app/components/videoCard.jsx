import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { icons } from "../../constants";
import { Video, ResizeMode } from "expo-av";

const VideoCard = ({
  video: {
    title,
    thumbNail,
    video,
    creator: { username, avatar },
  },
}) => {
  const [play, SetPlaying] = useState(false);

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row items-start gap-3">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px]  h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              resizeMode="cover"
              className="w-full h-full rounded-lg"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1 ">
            <Text
              className="text-white font-psemibold  text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-gray-100 font-pregular  text-xs"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image className="w-5 h-5" resizeMode="contain" source={icons.menu} />
        </View>
      </View>
      {play ? (
        <Video
          source={{
            uri: video,
          }}
          className="w-full h-60 rounded-xl mt-3"
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              SetPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            SetPlaying(true);
          }}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center "
        >
          <Image
            className="h-full w-full rounded-xl mt-3"
            resizeMode="cover"
            source={{ uri: thumbNail }}
          />
          <Image
            className="w-12 h-12 absolute"
            resizeMethod="contain"
            source={icons.play}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
