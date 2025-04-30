import { useState, useCallback } from "react"
import { StyleSheet, ScrollView, Pressable, Image } from "react-native"
import { useFocusEffect, router } from "expo-router"
import { Text, View } from "@/components/Themed"

import { errors } from "com"
import { data } from "@/data"

import { getUserData } from "@/services/user/regular"
import { getSuggestedWorkouts } from "@/services/workouts"
import { getMyCustomRoutines, getRoutineOfTheDay, getSuggestedRoutines } from "@/services/routines"
import { getSavedRoutines } from "@/services/user/regular"
import { RoutineType, WorkoutType } from "com/types"


const { NotFoundError } = errors

export default function Home() {
    const [alias, setAlias] = useState("User")
    const [interests, setInterests] = useState<string[]>([])

    const [currentRoutine, setCurrentRoutine] = useState<{ id: string; type: "custom" | "regular" } | null>(null)
    const [loadingRoutineOfDay, setLoadingRoutineOfDay] = useState(false)

    const [suggestedWorkouts, setSuggestedWorkouts] = useState<WorkoutType[]>([])
    const [suggestedRoutines, setSuggestedRoutines] = useState<RoutineType[]>([])


    useFocusEffect(
        useCallback(() => {
            Promise.all([
                getUserData(),
                getSuggestedWorkouts(),
                getSuggestedRoutines()
            ])
                .then(([user, workouts, routines]) => {
                    setAlias(user.alias)
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
            .then(routine => {
                if (!routine?.id) return

                router.push({
                    pathname: "/(stack)/RoutineDetail/[routineId]",
                    params: { routineId: routine.id }
                })
            })
            .catch(error => {
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
            {interests.length === 0 && (<Pressable
                style={styles.buttonPrimary}
                onPress={() => router.push("/(stack)/PreferenceTest")}
            >
                <Text style={styles.buttonPrimaryText}>Complete preference test</Text>
            </Pressable>)}


            {/* Quick access cards */}
            <Pressable
                style={styles.card}
                onPress={() => router.push("/(tabs)/Profile")}
            >
                <Text style={styles.cardTitle}>Complete profile data</Text>
                <Text style={styles.cardSubtext}>Preview</Text>
            </Pressable>


            <Pressable
                style={styles.card}
                disabled={!currentRoutine}
                onPress={() => {
                    if (!currentRoutine) return

                    const { id, type } = currentRoutine

                    router.push({
                        pathname:
                            type === "custom"
                                ? "/(stack)/CustomRoutineDetail/[routineId]"
                                : "/(stack)/RoutineDetail/[routineId]",
                        params: { routineId: id },
                    })
                }}
            >
                <Text style={styles.cardTitle}>Current routine</Text>
                <Text style={styles.cardSubtext}>
                    {currentRoutine ? "Tap to view your latest routine" : "No routine found"}
                </Text>
            </Pressable>


            <Pressable style={styles.card} onPress={handleRoutineOfTheDay} disabled={loadingRoutineOfDay}>
                <Text style={styles.cardTitle}>
                    Routine of the Day!
                </Text>
                <Text style={styles.cardSubtext}>
                    {loadingRoutineOfDay ? "Loading..." : "Tap to view a fresh suggestion"}
                </Text>
            </Pressable>


            {/* Smart suggestions */}
            <Text style={styles.sectionTitle}>Smart suggestions</Text>

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
                        <Text style={styles.cardMiniTitle}>{workout.name}</Text>
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
                        <Text style={styles.cardMiniTitle}>{routine.name}</Text>
                    </Pressable>
                ))}
            </ScrollView>


            {/* Tips and reminders */}
            {/* <Text style={styles.sectionTitle}>Tips & Reminders</Text>
            <View style={styles.tips}>
                <Text style={styles.tip}>• Lorem ipsum</Text>
                <Text style={styles.tip}>• Lorem ipsum</Text>
                <Text style={styles.tip}>• Lorem ipsum</Text>
            </View> */}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        marginBottom: 20,
    },
    logo: {
        fontSize: 24,
        fontWeight: "bold",
    },
    welcome: {
        fontSize: 22,
        fontWeight: "600",
        marginTop: 8,
    },
    buttonPrimary: {
        backgroundColor: "#555",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 20,
    },
    buttonPrimaryText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
    card: {
        backgroundColor: "#ddd",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    cardTitle: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 4,
    },
    cardSubtext: {
        color: "#666",
        fontSize: 14,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 24,
        marginBottom: 12,
    },
    suggestions: {
        flexDirection: "row",
        gap: 12,
    },
    suggestionCard: {
        width: 100,
        height: 100,
        backgroundColor: "#ccc",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    tips: {
        marginTop: 8,
    },
    tip: {
        fontSize: 14,
        marginBottom: 6,
    },
    logout: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 6,
        backgroundColor: "#c00",
        borderRadius: 8,
    },
    horizontalList: {
        flexDirection: "row",
        marginBottom: 20,
    },
    cardMini: {
        width: 140,
        marginRight: 12,
        backgroundColor: "#eee",
        borderRadius: 12,
        overflow: "hidden",
    },
    cardMiniImage: {
        width: "100%",
        height: 80,
    },
    cardMiniTitle: {
        fontWeight: "600",
        fontSize: 14,
        padding: 8,
    }
})