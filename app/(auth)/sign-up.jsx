import React, { useState } from "react";
import { View, Text, Image, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";

import FormField from "../components/formField";

import BusyButton from "../components/busyButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/globalprovider";

const SignUp = () => {
  const { SetUser, SetIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill all fields");
    } else {
      setIsSubmitting(true);
      try {
        const result = await createUser(
          form.email,
          form.password,
          form.username
        );

        SetUser(result);
        SetIsLoggedIn(true);

        router.replace("/home");
      } catch (error) {
        console.log(error.message);
        Alert.alert("Error", error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full  ">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[115px]"
          />
          <Text className="text-white text-2xl mt-10 font-psemibold text-semibold">
            Sign up to Aora
          </Text>
          <FormField
            otherStyles={"mt-7"}
            title={"Username"}
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            placeholder={"Your unique username"}
          />
          <FormField
            otherStyles={"mt-7"}
            title={"Email"}
            value={form.email}
            handleChangeText={(e) => {
              setForm({ ...form, email: e });
            }}
            keyBoardType="email-address"
            placeholder={"Enter email"}
          />
          <FormField
            otherStyles={"mt-7"}
            title={"Password"}
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            keyBoardType="password"
            placeholder={"Enter Password"}
          />

          <BusyButton
            containerStyles={"mt-7"}
            onpress={submit}
            text={"Sign Up"}
            isLoading={isSubmitting}
          />
          <View className="flex-row mt-7 justify-center">
            <Text className="text-white text-lg text-gray-100 text-font-regular">
              Already have an account? {""}
              <Link
                href={"/sign-in"}
                className="text-secondary text-lg font-psemibold "
              >
                Sign In
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
