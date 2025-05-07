import { useEffect, useState, useCallback } from "react"
import { useFocusEffect, useRouter } from "expo-router"
import {
    FlatList,
    Pressable,
    RefreshControl,
    StyleSheet,
    View,
    Text,
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
        getModeratorWorkouts().then(setWorkouts).finally(() => setRefreshing(false))
    }, [])

    const fetchRoutines = useCallback(() => {
        setRefreshing(true)
        getModeratorRoutines().then(setRoutines).finally(() => setRefreshing(false))
    }, [])

    useFocusEffect(
        useCallback(() => {
            const fetch = activeTab === "workouts" ? fetchWorkouts : fetchRoutines
            fetch()

            const interval = setInterval(fetch, 3000)

            return () => clearInterval(interval)
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
            style={styles.container}
            data={data}
            keyExtractor={item => item.id}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={activeTab === "workouts" ? fetchWorkouts : fetchRoutines}
                />
            }
            ListHeaderComponent={
                <>
                    <View style={styles.tabs}>
                        <Pressable
                            style={[styles.tab, activeTab === "workouts" && styles.tabActive]}
                            onPress={() => setActiveTab("workouts")}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    activeTab === "workouts" && styles.tabTextActive,
                                ]}
                            >
                                Workouts
                            </Text>
                        </Pressable>

                        <Pressable
                            style={[styles.tab, activeTab === "routines" && styles.tabActive]}
                            onPress={() => setActiveTab("routines")}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    activeTab === "routines" && styles.tabTextActive,
                                ]}
                            >
                                Routines
                            </Text>
                        </Pressable>
                    </View>
                </>
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
                    {activeTab === "routines"
                        ? "No pending routines found"
                        : "No pending workouts found"}
                </Text>
            }
        />
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#000",
    },
    tabs: {
        paddingTop: 28,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: 24,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        backgroundColor: "rgba(179, 179, 179, 0.74)",
        borderRadius: 10,
        alignItems: "center",
    },

    tabActive: {
        backgroundColor: "#facc15",
    },
    tabText: {
        fontWeight: "600",
        color: "#333",
        fontSize: 14,
    },
    tabTextActive: {
        color: "#000",
        fontWeight: "700",
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