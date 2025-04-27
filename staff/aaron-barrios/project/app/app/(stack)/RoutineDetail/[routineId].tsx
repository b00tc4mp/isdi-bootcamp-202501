import { useEffect, useState } from "react"
import { useLocalSearchParams, useRouter } from "expo-router"
import { ActivityIndicator, Image, ScrollView, StyleSheet, Pressable } from "react-native"
import { Text, View } from "@/components/Themed"

import {
    getRoutineById,
    toggleLikeRoutine,
    toggleSaveRoutine,
    reviewRoutine
} from "@/services/routines"

import { RoutineType } from "com/types"
import { getUserRole } from "@/services/user"


export default function RoutineDetail() {
    const { routineId } = useLocalSearchParams<{ routineId: string }>()
    const router = useRouter()

    console.log('Routine ID recibido:', routineId)

    const [routine, setRoutine] = useState<RoutineType | null>(null)
    const [loading, setLoading] = useState(true)
    const [toggle, setToggle] = useState(false)
    const [role, setRole] = useState<string | null>(null)

    const fetchRoutine = () => {
        if (!routineId) return
        setLoading(true)
        getRoutineById(routineId)
            .then(setRoutine)
            .catch(error => console.error("Error loading routine:", error))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getUserRole().then(data => setRole(data?.role || null))
    }, [])

    useEffect(() => {
        fetchRoutine()
    }, [routineId])

    const handleToggleLike = () => {
        if (!routineId) return
        setToggle(true)
        toggleLikeRoutine(routineId)
            .then(fetchRoutine)
            .finally(() => setToggle(false))
    }

    const handleToggleSave = () => {
        if (!routineId) return
        setToggle(true)
        toggleSaveRoutine(routineId)
            .then(fetchRoutine)
            .finally(() => setToggle(false))
    }

    const handleReview = (status: "accepted" | "declined") => {
        if (!routineId) return
        reviewRoutine(routineId, status)
            .then(() => router.back())
            .catch(error => console.error("Review error:", error))
    }

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#888" />
            </View>
        )
    }

    if (!routine) {
        return (
            <View style={styles.centered}>
                <Text>Routine not found</Text>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            {/* Back Button */}
            <Pressable onPress={() => router.back()} style={styles.backButton}>
                <Text style={styles.backIcon}>←</Text>
            </Pressable>

            {/* Title */}
            <Text style={styles.title}>{routine.name}</Text>

            {/* Feed Image */}
            <Image source={{ uri: routine.feedImage }} style={styles.image} />

            {/* Summary Card */}
            <View style={styles.summaryCard}>
                <View style={styles.summaryLeft}>
                    {/* <Text style={styles.summaryText}>📍 {routine.locationType || "Gym"}</Text> */}
                    <Text style={styles.summaryText}>💪 {routine.muscleGroup}</Text>
                    <Text style={styles.summaryText}>🔥 {routine.difficulty || "Intermediate"}</Text>
                    <Text style={styles.summaryText}>🕒 {routine.duration.toString()} min</Text>
                    {/* Frecuencia sugerida si la tuvieras */}
                    {/* <Text style={styles.summaryText}>📅 x3 per week</Text> */}
                </View>
                <View style={styles.summaryRight}>
                    <Pressable onPress={handleToggleLike} disabled={toggle || routine.status !== "accepted"}>
                        <Text style={styles.icon}>{routine.likedByMe ? "❤️" : "🤍"} {routine.likesCount}</Text>
                    </Pressable>
                    <Pressable onPress={handleToggleSave} disabled={toggle || routine.status !== "accepted"}>
                        <Text style={styles.icon}>{routine.savedByMe ? "📌" : "📃"} {routine.savesCount}</Text>
                    </Pressable>
                </View>
            </View>

            {/* Description */}
            <Text style={styles.subtitle}>Description</Text>
            <Text style={styles.description}>{routine.description}</Text>

            {/* Workouts List */}
            <Text style={styles.subtitle}>Workouts</Text>
            {routine.workouts.map((rw, index) => (
                <View key={index} style={styles.workoutItem}>
                    <Text style={styles.workoutName}>{rw.workout.name}</Text>
                    <View style={styles.workoutDataRow}>
                        <Text style={styles.workoutData}>{rw.sets} sets</Text>
                        <Text style={styles.workoutData}>{rw.reps} reps</Text>
                        <Text style={styles.workoutData}>{rw.weight} kg</Text>
                        <Text style={styles.workoutData}>{rw.restTime}" rest</Text>
                    </View>
                </View>
            ))}

            {/* Review Actions (Moderators Only) */}
            {role === "mod" && routine.status === "pending" && (
                <View style={styles.reviewActions}>
                    <Pressable style={[styles.reviewButton, styles.acceptBtn]} onPress={() => handleReview("accepted")}>
                        <Text style={styles.reviewText}>✅ Accept</Text>
                    </Pressable>
                    <Pressable style={[styles.reviewButton, styles.declineBtn]} onPress={() => handleReview("declined")}>
                        <Text style={styles.reviewText}>❌ Decline</Text>
                    </Pressable>
                </View>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    backButton: {
        marginBottom: 12,
    },
    backIcon: {
        fontSize: 26,
        color: "#555",
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 8,
    },
    summaryCard: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 12,
        marginBottom: 16,
        elevation: 2,
    },
    summaryLeft: {
        flex: 1,
        gap: 4,
    },
    summaryRight: {
        justifyContent: "center",
        alignItems: "flex-end",
        gap: 8,
    },
    summaryText: {
        fontSize: 14,
        color: "#333",
    },
    icon: {
        fontSize: 18,
    },
    subtitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 16,
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: "#444",
        marginBottom: 16,
    },
    workoutItem: {
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
    },
    workoutName: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 6,
    },
    workoutDataRow: {
        flexDirection: "row",
        gap: 16,
    },
    workoutData: {
        fontSize: 14,
        color: "#666",
    },
    reviewActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        gap: 12,
    },
    reviewButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    acceptBtn: {
        backgroundColor: "#3b944d",
    },
    declineBtn: {
        backgroundColor: "#a12828",
    },
    reviewText: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#fff",
    },
})