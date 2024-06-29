import React from "react";
import { View, Text, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";
import { icons } from "../../constants";

const TabIcon = ({ iconName, color, tabNname, focused }) => {
  return (
    <View className="items-center justify-center gap-2  ">
      <Image
        source={iconName}
        tintColor={color}
        className="w-6 h-6"
        resizeMode="contain"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs `}
        style={{ color: `${focused ? color : "white"}` }}
      >
        {tabNname}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,

          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDEO",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 100,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                iconName={icons.home}
                color={color}
                tabNname="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            headerShown: false,
            title: "Bookmark",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                iconName={icons.bookmark}
                color={color}
                tabNname="Bookmark"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            headerShown: false,
            title: "Create",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                iconName={icons.plus}
                color={color}
                tabNname="Create"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                iconName={icons.profile}
                color={color}
                tabNname="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
