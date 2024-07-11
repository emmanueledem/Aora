import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { icons } from "../../constants";
import { Video, ResizeMode } from "expo-av";

const ZoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};

const ZoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, SetPlay] = useState(false);
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? ZoomIn : ZoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{
            uri: item.video,
          }}
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
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
          className="relative items-center justify-center "
          activeOpacity={0.7}
          onPress={() => {
            SetPlay(true);
          }}
        >
          <ImageBackground
            source={{ uri: item.thumbNail }}
            resizeMode="cover"
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
          />
          <Image
            className="w-12 h-12 absolute"
            resizeMode="contain"
            source={icons.play}
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, SetActive] = useState(posts[1]);
  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      SetActive(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      onViewableItemsChanged={viewableItemsChanged}
      contentOffset={{ x: 170 }}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      horizontal
    />
  );
};

export default Trending;
