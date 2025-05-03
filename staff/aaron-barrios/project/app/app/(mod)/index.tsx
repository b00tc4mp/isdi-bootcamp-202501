import { useEffect, useState, useCallback } from "react"
import { useFocusEffect, useRouter } from "expo-router"
import { Text, View } from "@/components/Themed"
import {
    FlatList,
    Pressable,
    StyleSheet,
    RefreshControl,
} from "react-native"

import { getUserRole } from "@/services/user"
import { getModeratorWorkouts, reviewWorkout } from "@/services/workouts"
import { getModeratorRoutines } from "@/services/routines"

import WorkoutCard from "@/components/WorkoutCard"
import RoutineCard from "@/components/RoutineCard"
import type { WorkoutType, RoutineType } from "com/types"

export default function Review() {
    const router = useRouter()

    const [workouts, setWorkouts] = useState<WorkoutType[]>([])
    const [routines, setRoutines] = useState<RoutineType[]>([])
    const [refreshing, setRefreshing] = useState(false)
    const [activeTab, setActiveTab] = useState<"workouts" | "routines">("workouts")

    const fetchWorkouts = useCallback(() => {
        setRefreshing(true)
        getModeratorWorkouts()
            .then(setWorkouts)
            .finally(() => setRefreshing(false))
    }, [])

    const fetchRoutines = useCallback(() => {
        setRefreshing(true)
        getModeratorRoutines()
            .then(setRoutines)
            .finally(() => setRefreshing(false))
    }, [])

    useFocusEffect(
        useCallback(() => {
            if (activeTab === "workouts") fetchWorkouts()
            else fetchRoutines()
        }, [activeTab])
    )

    useEffect(() => {
        getUserRole().then(data => {
            if (data?.role !== "mod") {
                router.replace("/(auth)/Login")
            }
        })
    }, [])

    const handleWorkoutPress = (id: string) => {
        router.push(`/(stack)/WorkoutDetail/${id}`)
    }

    const handleRoutinePress = (id: string) => {
        router.push({
            pathname: "/(stack)/RoutineDetail/[routineId]",
            params: { routineId: id },
        })
    }

    const handleReview = (id: string, status: "accepted" | "declined") => {
        reviewWorkout(id, status)
            .then(fetchWorkouts)
            .catch(error => console.error("Review error:", error))
    }

    const data = activeTab === "workouts" ? workouts : routines

    return (
        <FlatList
            data={data}
            keyExtractor={item => item.id}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={activeTab === "workouts" ? fetchWorkouts : fetchRoutines}
                />
            }
            ListHeaderComponent={
                <View>
                    <Text style={styles.title}>Review</Text>

                    <View style={styles.tabs}>
                        <Pressable
                            style={[styles.tab, activeTab === "routines" && styles.tabInactive]}
                            onPress={() => setActiveTab("routines")}
                        >
                            <Text style={activeTab === "routines" ? styles.tabTextActive : styles.tabText}>
                                Routines
                            </Text>
                        </Pressable>
                        <Pressable
                            style={[styles.tab, activeTab === "workouts" && styles.tabInactive]}
                            onPress={() => setActiveTab("workouts")}
                        >
                            <Text style={activeTab === "workouts" ? styles.tabTextActive : styles.tabText}>
                                Workouts
                            </Text>
                        </Pressable>
                    </View>
                </View>
            }
            renderItem={({ item }) =>
                activeTab === "workouts" ? (
                    <WorkoutCard
                        workout={item as WorkoutType}
                        onPress={() => handleWorkoutPress(item.id)}
                        onReview={handleReview}
                        showAuthor
                        showStatus
                    />
                ) : (
                    <RoutineCard
                        routine={item as RoutineType}
                        onPress={() => handleRoutinePress(item.id)}
                    />
                )
            }
            contentContainerStyle={styles.list}
            ListEmptyComponent={
                <Text style={styles.placeholder}>
                    {activeTab === "routines" ? "No pending routines found" : "No pending workouts found"}
                </Text>
            }
        />
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingTop: 24,
    },
    tabs: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: "#e5e5e5",
        marginHorizontal: 4,
        borderRadius: 10,
        alignItems: "center",
    },
    tabInactive: {
        backgroundColor: "#aaa",
    },
    tabText: {
        fontWeight: "600",
        color: "#333",
    },
    tabTextActive: {
        fontWeight: "700",
        color: "#000",
    },
    list: {
        gap: 12,
        paddingBottom: 80,
        paddingHorizontal: 16,
    },
    placeholder: {
        marginTop: 32,
        textAlign: "center",
        color: "#888",
        fontStyle: "italic",
    },
})