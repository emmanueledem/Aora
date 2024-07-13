import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/formField";
import { Video, ResizeMode } from "expo-av";
import { icons } from "../../constants";
import BusyButton from "../components/busyButton";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { createVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/globalprovider";

const Create = () => {
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbNail: null,
    prompt: null,
  });

  const [uploading, SetUploading] = useState(false);

  const { user } = useGlobalContext();

  const createPost = async () => {
    if (form.title && form.prompt && form.thumbNail && form.video) {
      SetUploading(true);
      try {
        await createVideo({ ...form, userId: user.$id });
        Alert.alert("Sucess", "Post uploaded successfully");
        router.push("/home");
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setForm({
          title: "",
          video: null,
          thumbNail: null,
          prompt: null,
        });
        SetUploading(false);
      }
    } else {
      return Alert.alert("Error", "please fill all fields");
    }
  };

  const openPicker = async (selectType) => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes:
    //     selectType === "video"
    //       ? ImagePicker.MediaTypeOptions.Videos
    //       : ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === "image" ? ["image/*"] : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbNail: result.assets[0] });
      } else {
        setForm({ ...form, video: result.assets[0] });
      }
    } else {
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView className="px-4 my-6">
        <Text className="text-white text-2xl font-psemibold">Upload Video</Text>
        <FormField
          title="Video Title"
          otherStyles="mt-10"
          value={form.title}
          handleChangeText={(e) => setForm({ ...form, title: e })}
          placeholder="Give your video a catchy title..."
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={async () => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.CONTAIN}
              />
            ) : (
              <View className="w-full h-40 px-4 items-center justify-center rounded-2xl bg-black-100">
                <View className="border border-dashed border-secondary-100 justify-center  items-center w-14 h-14">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbNail ? (
              <Image
                source={{ uri: form.thumbNail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="bg-black-100 w-full h-16  flex-row items-center justify-center  rounded-2xl">
                <Image
                  resizeMode="contain"
                  className="w-5 h-5"
                  source={icons.upload}
                />
                <Text className="text-center pl-3 text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI Prompt"
          otherStyles="mt-7"
          value={form.prompt}
          placeholder="The AI prompt of your video...."
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
        />
        <BusyButton
          containerStyles={"mt-7"}
          isLoading={uploading}
          onpress={async () => {
            await createPost();
          }}
          text="Submit & Publish"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
