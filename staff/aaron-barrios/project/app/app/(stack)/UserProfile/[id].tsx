import { useEffect, useState, useCallback } from "react"
import { router, useLocalSearchParams, useFocusEffect } from "expo-router"
import { ScrollView, Pressable, ActivityIndicator, Text, View, Image } from "react-native"

import type { RoutineType, WorkoutType } from "com/types"
import { getTargetUserData } from "@/services/user/regular"
import { getUserWorkouts } from "@/services/workouts"
import { getUserRoutines } from "@/services/routines"

import WorkoutCard from "@/components/WorkoutCard"
import RoutineCard from "@/components/RoutineCard"

import { styles } from "@/styles/otheUserProfile"

export default function UserProfile() {
    const { id } = useLocalSearchParams()
    const targetUserId = typeof id === "string" ? id : ""

    const [activeTab, setActiveTab] = useState<"data" | "workouts" | "routines">("data")
    const [userAlias, setUserAlias] = useState<string>("")
    const [userData, setUserData] = useState<{
        name?: string
        lastName?: string
        alias: string
        email?: string
    }>({ alias: "" })
    const [workouts, setWorkouts] = useState<WorkoutType[]>([])
    const [routines, setRoutines] = useState<RoutineType[]>([])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!targetUserId) return

        setLoading(true)
        getTargetUserData(targetUserId)
            .then(data => {
                setUserAlias(data.alias || "")
                setUserData(data)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [targetUserId])

    useEffect(() => {
        if (!targetUserId || activeTab !== "workouts") return

        setLoading(true)
        getUserWorkouts(targetUserId)
            .then(setWorkouts)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [targetUserId, activeTab])

    useEffect(() => {
        if (!targetUserId || activeTab !== "routines") return;

        setLoading(true)
        getUserRoutines(targetUserId)
            .then(setRoutines)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [targetUserId, activeTab])


    useFocusEffect(
        useCallback(() => {
            if (activeTab === "workouts" && targetUserId) {
                getUserWorkouts(targetUserId)
                    .then(setWorkouts)
                    .catch(console.error)
            }
        }, [activeTab, targetUserId])
    )

    useFocusEffect(
        useCallback(() => {
            if (activeTab === "routines" && targetUserId) {
                getUserRoutines(targetUserId)
                    .then(setRoutines)
                    .catch(console.error)
            }
        }, [activeTab, targetUserId])
    )

    const handleTabChange = (tab: typeof activeTab) => {
        setActiveTab(tab)
        if (tab === "workouts") {
            setWorkouts([])
        }
    }

    if (!targetUserId) return <Text style={styles.error}>Invalid user ID</Text>
    if (loading && activeTab !== "data") return <ActivityIndicator style={{ marginTop: 40 }} />

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>@{userAlias}'s profile</Text>
                <Pressable onPress={() => router.back()}>
                    <Image
                        source={require("@/assets/icons/back.png")}
                        style={{ width: 22, height: 22, tintColor: "#fff" }}
                    />
                </Pressable>
            </View>

            <View style={styles.tabs}>
                {["data", "workouts", "routines"].map(tab => (
                    <Pressable
                        key={tab}
                        style={[styles.tab, activeTab === tab && styles.activeTab]}
                        onPress={() => handleTabChange(tab as typeof activeTab)}
                    >
                        <Text>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
                    </Pressable>
                ))}
            </View>

            {activeTab === "data" && (
                <View style={[styles.dataContainer, styles.alignedContainer]}>
                    <Text style={styles.field}><Text style={styles.label}>Name:</Text> {userData.name || "-"}</Text>
                    <Text style={styles.field}><Text style={styles.label}>Last Name:</Text> {userData.lastName || "-"}</Text>
                    <Text style={styles.field}><Text style={styles.label}>Alias:</Text> {userData.alias}</Text>
                    <Text style={styles.field}><Text style={styles.label}>Email:</Text> {userData.email || "-"}</Text>
                </View>
            )}

            {activeTab === "workouts" && (
                <View style={{ marginTop: 12 }}>
                    {Array.isArray(workouts) && workouts.length > 0 ? (
                        workouts.map(workout => (
                            <WorkoutCard
                                key={workout.id}
                                workout={workout}
                                onPress={() => router.push(`/(stack)/WorkoutDetail/${workout.id}`)}
                                showStatus={false}
                                showAuthor={false}
                            />
                        ))
                    ) : (
                        <Text style={{ textAlign: "center", marginTop: 20 }}>No workouts found</Text>
                    )}
                </View>
            )}

            {activeTab === "routines" && (
                <View style={{ marginTop: 12 }}>
                    {Array.isArray(routines) && routines.length > 0 ? (
                        routines.map(routine => (
                            <RoutineCard
                                key={routine.id}
                                routine={routine}
                                onPress={() => router.push(`/(stack)/RoutineDetail/${routine.id}`)}
                                showStatus={false}
                                showAuthor={false}
                            />
                        ))
                    ) : (
                        <Text style={{ textAlign: "center", marginTop: 20 }}>No routines found</Text>
                    )}
                </View>
            )}
        </ScrollView>
    )
}