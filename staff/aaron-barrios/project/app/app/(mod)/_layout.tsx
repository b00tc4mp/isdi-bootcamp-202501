import { useEffect, useState } from "react"
import { Tabs, router } from "expo-router"
import { useColorScheme } from "@/components/useColorScheme"
import { Image, Text, View, Pressable } from "react-native"

import Colors from "@/constants/Colors"
import { getUserRole, logoutUser } from "@/services/user"

function CustomTabIcon({ icon, label, focused }: { icon: any, label: string, focused: boolean }) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", width: 80 }}>
      <Image
        source={icon}
        style={{
          width: 32,
          height: 32,
          tintColor: focused ? "#facc15" : "#aaa",
          marginTop: 20,
          marginBottom: 2,
        }}
        resizeMode="contain"
      />
      <Text style={{
        fontSize: 12,
        color: focused ? "#facc15" : "#aaa",
        maxWidth: 80,
        textAlign: "center",
      }}
        numberOfLines={1}
      >
        {label}
      </Text>
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

      // if mod, we authorize to mount layout
      setAuthorized(true)
    })
  }, [])

  const handleLogout = async () => {
    await logoutUser()
    router.replace("/(auth)/Login")
  }

  if (!authorized) return null

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
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
          height: 80
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