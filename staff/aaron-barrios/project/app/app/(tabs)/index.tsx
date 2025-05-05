import { useState, useCallback } from "react"
import { StyleSheet, ScrollView, Pressable, Image, Text, View } from "react-native"
import { useFocusEffect, router } from "expo-router"

import { errors } from "com"
import { data } from "@/data"

import { getUserData } from "@/services/user/regular"
import { getSuggestedWorkouts } from "@/services/workouts"
import { getMyCustomRoutines, getRoutineOfTheDay, getSuggestedRoutines } from "@/services/routines"
import { getSavedRoutines } from "@/services/user/regular"
import { RoutineType, UserType, WorkoutType } from "com/types"

import { styles } from "@/styles/userHome"

const { NotFoundError } = errors

export default function Home() {
    const [alias, setAlias] = useState("User")
    const [interests, setInterests] = useState<string[]>([])

    const [currentRoutine, setCurrentRoutine] = useState<{ id: string; type: "custom" | "regular" } | null>(null)
    const [loadingRoutineOfDay, setLoadingRoutineOfDay] = useState(false)

    const [suggestedWorkouts, setSuggestedWorkouts] = useState<WorkoutType[]>([])
    const [suggestedRoutines, setSuggestedRoutines] = useState<RoutineType[]>([])

    //check if userData completed
    const [userData, setUserData] = useState<UserType | null>(null)


    useFocusEffect(
        useCallback(() => {
            Promise.all([
                getUserData(),
                getSuggestedWorkouts(),
                getSuggestedRoutines()
            ])
                .then(([user, workouts, routines]) => {
                    setAlias(user.alias)
                    setUserData({
                        ...user,
                        createdAt: new Date(user.createdAt),
                    })
                    setInterests(user.interests ?? [])
                    setSuggestedWorkouts(workouts)
                    setSuggestedRoutines(routines)
                })
                .catch(error => {
                    console.error("Error loading home data:", error)
                    if (error instanceof NotFoundError) {
                        data.removeToken()
                        router.replace("/(auth)/Login")
                    }
                })

            loadCurrentRoutine()
        }, [])
    )


    const loadCurrentRoutine = () => {
        getMyCustomRoutines()
            .then(customs => {
                if (customs.length > 0) {
                    const sorted = customs.sort((a, b) =>
                        new Date(b.modifiedAt || b.createdAt).getTime() -
                        new Date(a.modifiedAt || a.createdAt).getTime()
                    )
                    setCurrentRoutine({ id: sorted[0].id, type: "custom" })
                } else {
                    return getSavedRoutines().then(saved => {
                        if (saved.length > 0) {
                            const sorted = saved.sort((a, b) =>
                                new Date(b.modifiedAt || b.createdAt).getTime() -
                                new Date(a.modifiedAt || a.createdAt).getTime()
                            )
                            setCurrentRoutine({ id: sorted[0].id, type: "regular" })
                        }
                    })
                }
            })
            .catch(error => {
                console.error("Error loading current routine:", error)
                setCurrentRoutine(null)
            })
    }


    const handleRoutineOfTheDay = () => {
        setLoadingRoutineOfDay(true)

        getRoutineOfTheDay()
            .then((routine: RoutineType | null) => {
                if (!routine?.id) return

                router.push({
                    pathname: "/(stack)/RoutineDetail/[routineId]",
                    params: { routineId: routine.id }
                })
            })
            .catch((error: Error) => {
                console.error("Routine of the day error:", error)
                alert("No available routine found today 😔")
            })
            .finally(() => setLoadingRoutineOfDay(false))
    }



    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.logo}>Welcome back, {alias}</Text>
            </View>

            {/* Preference test */}
            {interests.length === 0 && (
                <Pressable
                    style={styles.buttonPrimary}
                    onPress={() => router.push("/(stack)/PreferenceTest")}
                >
                    <Text style={styles.buttonPrimaryText}>Complete preference test</Text>
                </Pressable>
            )}

            {/* Complete profile card */}
            {userData && (!userData.name || !userData.lastName || !userData.level) && (
                <Pressable
                    style={styles.card}
                    onPress={() => router.push("/(tabs)/Profile")}
                >
                    <View style={styles.cardTextWrapper}>
                        <Text style={styles.cardTitle}>Complete profile data</Text>
                        <Text style={styles.cardSubtext}>Preview</Text>
                    </View>
                    <Image source={require("@/assets/icons/go.png")} style={styles.cardArrow} />
                </Pressable>
            )}

            {/* Current routine */}
            <Pressable
                style={styles.card}
                disabled={!currentRoutine}
                onPress={() => {
                    if (!currentRoutine) return
                    const { id, type } = currentRoutine
                    router.push({
                        pathname: type === "custom"
                            ? "/(stack)/CustomRoutineDetail/[routineId]"
                            : "/(stack)/RoutineDetail/[routineId]",
                        params: { routineId: id },
                    })
                }}
            >
                <View style={styles.cardTextWrapper}>
                    <Text style={styles.cardTitle}>My current routine</Text>
                    <Text style={styles.cardSubtext}>
                        {currentRoutine ? "Previous view of routine" : "No routine found"}
                    </Text>
                </View>
                <Image source={require("@/assets/icons/go.png")} style={styles.cardArrow} />
            </Pressable>

            {/* Routine of the Day */}
            <Pressable style={styles.card} onPress={handleRoutineOfTheDay} disabled={loadingRoutineOfDay}>
                <View style={styles.cardTextWrapper}>
                    <Text style={styles.cardTitle}>Routine of the day</Text>
                    <Text style={styles.cardSubtext}>
                        {loadingRoutineOfDay ? "Cargando..." : "Daily routine"}
                    </Text>
                </View>
                <Image source={require("@/assets/icons/go.png")} style={styles.cardArrow} />
            </Pressable>

            {/* Smart Suggestions */}
            <Text style={styles.sectionTitle}>Suggested Workouts</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
                {suggestedWorkouts.map(workout => (
                    <Pressable
                        key={workout.id}
                        onPress={() =>
                            router.push({ pathname: "/(stack)/WorkoutDetail/[workoutId]", params: { workoutId: workout.id } })
                        }
                        style={styles.cardMini}
                    >
                        <Image source={{ uri: workout.feedImage }} style={styles.cardMiniImage} />
                        <Text style={styles.cardMiniTitle} numberOfLines={1} ellipsizeMode="tail">
                            {workout.name}</Text>
                    </Pressable>
                ))}
            </ScrollView>

            <Text style={styles.sectionTitle}>Suggested Routines</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
                {suggestedRoutines.map(routine => (
                    <Pressable
                        key={routine.id}
                        onPress={() =>
                            router.push({ pathname: "/(stack)/RoutineDetail/[routineId]", params: { routineId: routine.id } })
                        }
                        style={styles.cardMini}
                    >
                        <Image source={{ uri: routine.feedImage }} style={styles.cardMiniImage} />
                        <Text style={styles.cardMiniTitle} numberOfLines={1} ellipsizeMode="tail">
                            {routine.name}</Text>
                    </Pressable>
                ))}
            </ScrollView>
        </ScrollView>
    )
}