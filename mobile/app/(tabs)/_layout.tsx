import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Home, Talk, Agenda, Settings } from "@/assets/icons/NavBar";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={28} fill={color} />,
        }}
      />
      <Tabs.Screen
        name="talk"
        options={{
          title: "Talk",
          tabBarIcon: ({ color }) => <Talk size={28} fill={color} />,
        }}
      />
      <Tabs.Screen
        name="agenda"
        options={{
          title: "Agenda",
          tabBarIcon: ({ color }) => <Agenda size={28} fill={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <Settings size={28} fill={color} />,
        }}
      />
      <Tabs.Screen
        name="discovery"
        options={{
          title: "Discovery",
          href: null,
        }}
      />
      <Tabs.Screen
        name="chatia"
        options={{
          title: "Chat IA",
          href: null,
        }}
      />
    </Tabs>
  );
}
