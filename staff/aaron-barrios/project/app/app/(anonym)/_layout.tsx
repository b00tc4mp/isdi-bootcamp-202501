import { Tabs } from "expo-router"
import { FontAwesome5 } from "@expo/vector-icons"
import { useColorScheme } from "@/components/useColorScheme"
import Colors from "@/constants/Colors"

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>["name"]
  color: string
}) {
  return <FontAwesome5 size={24} style={{ marginBottom: -4 }} {...props} />
}

//mirar libreria => https://icons.expo.fyi

export default function AnonLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Anonym_Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="anonym_home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Workouts"
        options={{
          title: "Workouts",
          tabBarIcon: ({ color }) => <TabBarIcon name="dumbbell" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Routines"
        options={{
          title: "Routines",
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
    </Tabs>
  )
}