import { useEffect, useState } from "react"
import { Tabs, router } from "expo-router"
import { useColorScheme } from "@/components/useColorScheme"
import { Image, Text, View } from "react-native"

import Colors from "@/constants/Colors"
import { getUserRole } from "@/services/user"

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
        fontSize: 10,
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

export default function AnonLayout() {
  const colorScheme = useColorScheme()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    getUserRole().then(data => {
      const role = data?.role

      if (role === "regular") {
        router.replace("/(tabs)")
        return
      }

      if (role === "mod") {
        router.replace("/(mod)")
        return
      }

      // Si es anonym, permitimos montar el layout
      setAuthorized(true)
    })
  }, [])

  if (!authorized) return null

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarShowLabel: false,
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
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon icon={require("@/assets/icons/home.png")} label="Home" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="Workouts"
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon icon={require("@/assets/icons/workout.png")} label="Workouts" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="Routines"
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon icon={require("@/assets/icons/routine.png")} label="Routines" focused={focused} />
          ),
        }}
      />
    </Tabs>
  )
}