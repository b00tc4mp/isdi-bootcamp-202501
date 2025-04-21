import { Tabs } from "expo-router"
import { useEffect, useState } from "react"
import { Image } from "react-native"

import { data } from "@/data"
import { getUserRole } from "@/services/session"

export default function CustomTabs() {
    const [tokenExists, setTokenExists] = useState<boolean | null>(null)
    const [role, setRole] = useState<string | null>(null)

    useEffect(() => {
        const checkAuth = async () => {
            const token = await data.getToken()
            if (!token) {
                setTokenExists(false)
                return
            }

            const userRole = await getUserRole()
            setTokenExists(true)
            setRole(userRole?.role ?? null)
        }

        checkAuth()
    }, [])

    if (tokenExists === null) return null
    if (!tokenExists) return null

    return (
        <Tabs screenOptions={{ headerShown: false }}>
            {/* Visible para todos */}
            <Tabs.Screen
                name="index"
                options={{
                    title: "Tzend",
                    tabBarIcon: () => <Image source={require("@/assets/icons/home.png")} style={{ width: 24, height: 24 }} />,
                }}
            />

            <Tabs.Screen
                name="Workouts"
                options={{
                    title: "Workouts",
                    tabBarIcon: () => <Image source={require("@/assets/icons/workout.png")} style={{ width: 24, height: 24 }} />,
                }}
            />

            <Tabs.Screen
                name="Routines"
                options={{
                    title: "Routines",
                    tabBarIcon: () => <Image source={require("@/assets/icons/routine.png")} style={{ width: 24, height: 24 }} />,
                }}
            />


            {role === "regular" && (
                <Tabs.Screen
                    name="Breakdown"
                    options={{
                        title: "Breakdown",
                        tabBarIcon: () => <Image source={require("@/assets/icons/breakdown.png")} style={{ width: 24, height: 24 }} />,
                    }}
                />
            )}

            <Tabs.Screen
                name="Profile"
                options={{
                    title: "Profile",
                    tabBarIcon: () => <Image source={require("@/assets/icons/profile.png")} style={{ width: 24, height: 24 }} />,
                }}
            />

            {role === "mod" && (
                <Tabs.Screen
                    name="ReviewPanel"
                    options={{
                        title: "Review",
                        tabBarIcon: () => <Image source={require("@/assets/icons/review.png")} style={{ width: 24, height: 24 }} />,
                    }}
                />
            )}
        </Tabs>
    )
}