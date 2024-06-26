import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";

import FormField from "../components/formField";

import BusyButton from "../components/busyButton";
import { Link } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const submit = () => {};

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
            handleChangeText={(e) => setForm({ ...form, email: e })}
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
            text={"Log In"}
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
