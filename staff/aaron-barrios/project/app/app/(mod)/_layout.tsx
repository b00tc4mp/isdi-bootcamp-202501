import { useEffect, useState } from "react"
import { Tabs, router } from "expo-router"
import { useColorScheme } from "@/components/useColorScheme"
import { Image, Text, View, Pressable } from "react-native"

import Colors from "@/constants/Colors"
import { getUserRole, logoutUser } from "@/services/session"

function CustomTabIcon({ icon, label, focused }: { icon: any, label: string, focused: boolean }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={icon}
        style={{
          width: 24,
          height: 24,
          tintColor: focused ? "#facc15" : "#aaa",
          marginBottom: 2,
        }}
        resizeMode="contain"
      />
      <Text style={{
        fontSize: 10,
        color: focused ? "#facc15" : "#aaa",
      }}>{label}</Text>
    </View>
  )
}

export default function ModLayout() {
  const colorScheme = useColorScheme()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    getUserRole().then(data => {
      const role = data?.role

      if (role === "regular") {
        router.replace("/(tabs)")
        return
      }

      if (role === "anonym") {
        router.replace("/(anonym)")
        return
      }

      // Si es mod, permitimos montar el layout
      setAuthorized(true)
    })
  }, [])

  const handleLogout = async () => {
    await logoutUser()
    router.replace("/(auth)")
  }

  if (!authorized) return null

  return (
    <Tabs
      screenOptions={{
        headerRight: () => (
          <Pressable onPress={handleLogout} style={{ marginRight: 15 }}>
            <Image
              source={require("@/assets/icons/logout.png")}
              style={{ width: 22, height: 22, tintColor: "#fff" }}
            />
          </Pressable>
        ),
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontSize: 28,
          fontWeight: "bold",
          color: "#fff",
        },
        headerStyle: {
          backgroundColor: "#111",
        },
        tabBarStyle: {
          backgroundColor: "#111",
          borderTopWidth: 0,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Review",
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon icon={require("@/assets/icons/review.png")} label="Review" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          headerTitle: "Profile",
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon icon={require("@/assets/icons/profile.png")} label="Profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  )
}