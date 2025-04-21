import { useEffect, useState } from "react"
import { Tabs, router } from "expo-router"
import { Image, Text, View, Pressable } from "react-native"

import { data } from "@/data"
import { getUserRole } from "@/services/session"
import { logoutUser } from "@/services/session"
import type { UserRole } from "../../../api/src/data/types"

function TabIcon({ icon, label, focused }: { icon: any; label: string; focused: boolean }) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
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
      <Text style={{ fontSize: 10, color: focused ? "#facc15" : "#aaa" }}>{label}</Text>
    </View>
  )
}

export default function TabsLayout() {
  const [ready, setReady] = useState(false)
  const [role, setRole] = useState<Extract<UserRole, "regular" | "mod"> | null>(null)

  useEffect(() => {
    const checkRole = async () => {
      const token = await data.getToken()
      if (!token) return router.replace("/(auth)")

      const userData = await getUserRole()
      const role = userData?.role ?? "unknown"

      if (role === "anonym" || role === "unknown") {
        router.replace("/(anonym)")
        return
      }

      setRole(role)
      setReady(true)
    }

    checkRole()
  }, [])

  const handleLogout = async () => {
    await logoutUser()
    router.replace("/(auth)")
  }

  if (!ready) return null

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#111",
          borderTopWidth: 0,
          height: 60,
        },
        headerRight: () => (
          <Pressable onPress={handleLogout} style={{ marginRight: 15 }}>
            <Image
              source={require("@/assets/icons/logout.png")}
              style={{ width: 22, height: 22, tintColor: "#fff" }}
            />
          </Pressable>
        ),
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontSize: 28,
          fontWeight: "bold",
          color: "#fff",
        },
        headerStyle: {
          backgroundColor: "#111",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Tzend",
          headerTitle: "Tzend",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={require("@/assets/icons/home.png")} label="Tzend" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="Workouts"
        options={{
          tabBarLabel: "Workouts",
          headerTitle: "Workouts",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={require("@/assets/icons/workout.png")} label="Workouts" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="Routines"
        options={{
          tabBarLabel: "Routines",
          headerTitle: "Routines",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={require("@/assets/icons/routine.png")} label="Routines" focused={focused} />
          ),
        }}
      />

      {role === "regular" && (
        <Tabs.Screen
          name="Breakdown"
          options={{
            tabBarLabel: "Breakdown",
            headerTitle: "Breakdown",
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={require("@/assets/icons/breakdown.png")} label="Breakdown" focused={focused} />
            ),
          }}
        />
      )}

      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          headerTitle: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={require("@/assets/icons/profile.png")} label="Profile" focused={focused} />
          ),
        }}
      />

      {role === "mod" && (
        <Tabs.Screen
          name="ReviewPanel"
          options={{
            tabBarLabel: "Review",
            headerTitle: "Review",
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={require("@/assets/icons/review.png")} label="Review" focused={focused} />
            ),
          }}
        />
      )}
    </Tabs>
  )
}