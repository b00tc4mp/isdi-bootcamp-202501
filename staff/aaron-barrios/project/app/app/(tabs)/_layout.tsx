import React, { useEffect } from "react"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Tabs, router } from "expo-router"
import { Pressable, Alert } from "react-native"

import Colors from "@/constants/Colors"
import { useColorScheme } from "@/components/useColorScheme"
import { useClientOnlyValue } from "@/components/useClientOnlyValue"

import { logoutUser } from "@/services/session"
import { data } from "@/data"

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"]
  color: string
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
  const colorScheme = useColorScheme()

  useEffect(() => {
    const validateSession = async () => {
      const token = await data.getToken()
      if (!token) {
        router.replace("/(auth)/Login")
      }
    }

    validateSession()
  }, [])

  const handleLogout = async () => {
    await logoutUser()
    router.replace("/(auth)/Login")
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "💪Tzend",
          headerShown: true,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Pressable onPress={handleLogout}>
              {({ pressed }) => (
                <FontAwesome
                  name="power-off"
                  size={24}
                  color={Colors[colorScheme ?? "light"].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
      />

      <Tabs.Screen
        name="Workouts"
        options={{
          title: "Workouts",
          tabBarIcon: ({ color }) => <TabBarIcon name="bicycle" color={color} />,
        }}
      />

      <Tabs.Screen
        name="Routines"
        options={{
          title: "Routines",
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />

      <Tabs.Screen
        name="Breakdown"
        options={{
          title: "Breakdown",
          tabBarIcon: ({ color }) => <TabBarIcon name="line-chart" color={color} />,
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  )
}