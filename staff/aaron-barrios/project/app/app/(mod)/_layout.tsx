import { Tabs } from "expo-router"
import { Image } from "react-native"

import { useColorScheme } from "@/components/useColorScheme"
import Colors from "@/constants/Colors"

function CustomTabIcon({ icon, label, focused }: { icon: any, label: string, focused: boolean }) {
  return (
    <Image
      source={icon}
      style={{
        width: 24,
        height: 24,
        tintColor: focused ? "#facc15" : "#aaa",
      }}
      resizeMode="contain"
    />
  )
}

export default function ModLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#111",
          borderTopWidth: 0,
          height: 60
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon icon={require("@/assets/icons/profile.png")} label="Profile" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="Review"
        options={{
          title: "Review",
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon icon={require("@/assets/icons/review.png")} label="Review" focused={focused} />
          ),
        }}
      />
    </Tabs>
  )
}