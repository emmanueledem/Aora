import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { Link } from "expo-router";
import FormField from "../components/formField";
import BusyButton from "../components/busyButton";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const Submit = () => {};

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6 w-full">
          <Image
            resizeMode="contain"
            className="w-[115px] h-[35px]"
            source={images.logo}
          />
          <Text className="text-white text-2xl mt-10 font-psemibold text-semibold ">
            Login to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            placeholder={"enter email"}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyBoardType="email-address"
          />
          <FormField
            title="Password"
            placeholder={"enter password"}
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7 mb-8 "
          />
          <View className="text-lg  text-gray-100 text-font-regular flex-row justify-end ">
            <Text className=" text-white">Forgot password</Text>
          </View>
          <BusyButton
            text={"Sign In"}
            onpress={Submit}
            containerStyles={"mt-7"}
            isLoading={isSubmitting}
          />

          <View className="mt-7 justify-center flex-row">
            <Text className="text-white text-lg text-gray-100 text-font-regular ">
              Don’t have an account?{" "}
              <Link
                href={"sign-up"}
                className="text-secondary  text-lg font-psemibold "
              >
                Sign up
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
