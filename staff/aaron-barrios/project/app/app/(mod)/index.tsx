import { useEffect, useState, useCallback } from "react"
import { useFocusEffect, useRouter } from "expo-router"
import { Text, View } from "@/components/Themed"
import {
    ScrollView,
    Pressable,
    StyleSheet,
    FlatList,
    RefreshControl,
} from "react-native"

import { getUserRole } from "@/services/user"
import { getModeratorWorkouts } from "@/services/workouts"
import { getModeratorRoutines } from "@/services/routines"
import { reviewWorkout } from "@/services/workouts"

import WorkoutCard from "@/components/WorkoutCard"
import { WorkoutType, RoutineType } from "com/types"
import RoutineCard from "@/components/RoutineCard"

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

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <Text style={styles.title}>Review</Text>

            {/* Tabs */}
            <View style={styles.tabs}>
                <Pressable
                    style={[styles.tab, activeTab === "routines" && styles.tabInactive]}
                    onPress={() => setActiveTab("routines")}
                >
                    <Text style={activeTab === "routines" ? styles.tabTextActive : styles.tabText}>Routines</Text>
                </Pressable>
                <Pressable
                    style={[styles.tab, activeTab === "workouts" && styles.tabInactive]}
                    onPress={() => setActiveTab("workouts")}
                >
                    <Text style={activeTab === "workouts" ? styles.tabTextActive : styles.tabText}>Workouts</Text>
                </Pressable>
            </View>

            {/* Content */}
            {activeTab === "workouts" ? (
                <FlatList
                    data={workouts}
                    keyExtractor={item => item.id}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchWorkouts} />}
                    renderItem={({ item }) => (
                        <WorkoutCard
                            workout={item}
                            onPress={() => handleWorkoutPress(item.id)}
                            onReview={handleReview}
                            showAuthor
                            showStatus
                            showReviewButtons
                        />
                    )}
                    contentContainerStyle={styles.list}
                />
            ) : (
                <FlatList
                    data={routines}
                    keyExtractor={item => item.id}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchRoutines} />}
                    renderItem={({ item }) => (
                        <RoutineCard
                            routine={item}
                            onPress={() => handleRoutinePress(item.id)}
                        />
                    )}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={<Text style={styles.placeholder}>No pending routines found</Text>}
                />
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 16,
    },
    tabs: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 16,
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
    },
    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
    },
    placeholder: {
        marginTop: 32,
        textAlign: "center",
        color: "#888",
        fontStyle: "italic",
    },
})