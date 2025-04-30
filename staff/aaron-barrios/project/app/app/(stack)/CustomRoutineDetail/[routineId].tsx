import { useEffect, useState } from "react"
import { useLocalSearchParams, useRouter } from "expo-router"
import { ActivityIndicator, Image, ScrollView, StyleSheet, Pressable, Alert } from "react-native"
import { Text, View } from "@/components/Themed"

import { getCustomRoutineById, deleteCustomRoutine } from "@/services/routines"
import { getCurrentUser } from "@/services/user"
import { CustomRoutineType } from "com/types"

export default function CustomRoutineDetail() {
    const { routineId } = useLocalSearchParams<{ routineId: string }>()
    const router = useRouter()

    const [routine, setRoutine] = useState<CustomRoutineType | null>(null)
    const [loading, setLoading] = useState(true)
    const [userId, setUserId] = useState<string | null>(null)


    useEffect(() => {
        getCurrentUser()
            .then(user => setUserId(user.id))
            .catch(error => {
                console.error("Error loading userId:", error)
                setUserId(null)
            })
    }, [])

    useEffect(() => {
        if (userId) {
            fetchRoutine()
        }
    }, [routineId, userId])


    const fetchRoutine = () => {
        if (!routineId || !userId) return
        setLoading(true)
        getCustomRoutineById(routineId, userId)
            .then(setRoutine)
            .catch(error => console.error("Error loading custom routine:", error))
            .finally(() => setLoading(false))
    }

    const handleEdit = () => {
        if (!routineId) return
        router.push(`/(stack)/UpdateCustomRoutine/${routineId}` as any)
    }

    const handleDelete = () => {
        if (!routineId) return

        deleteCustomRoutine(routineId)
            .then(() => {
                router.back()
                setTimeout(() => {
                    Alert.alert("Routine Deleted", "Your custom routine has been removed.")
                }, 300)
            })
            .catch(error => {
                console.error("Error deleting custom routine:", error)
                Alert.alert("Error", "Could not delete the custom routine.")
            })
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
                <Text>Custom Routine not found</Text>
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
                    <Text style={styles.summaryText}>💪 {routine.muscleGroup}</Text>
                    <Text style={styles.summaryText}>🕒 {routine.duration} min</Text>
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
                    {rw.workout.feedImage && (
                        <Image
                            source={{ uri: rw.workout.feedImage }}
                            style={styles.workoutImage}
                        />
                    )}
                    <View style={styles.workoutDataRow}>
                        <Text style={styles.workoutData}>{rw.sets} sets</Text>
                        <Text style={styles.workoutData}>{rw.reps} reps</Text>
                        <Text style={styles.workoutData}>{rw.weight} kg</Text>
                        <Text style={styles.workoutData}>{rw.restTime}" rest</Text>
                    </View>
                </View>
            ))}


            {/* Action Buttons */}
            <View style={styles.actionButtons}>
                <Pressable style={[styles.actionButton, styles.editButton]} onPress={handleEdit}>
                    <Text style={styles.actionText}>✏️ Edit Routine</Text>
                </Pressable>

                <Pressable style={[styles.actionButton, styles.deleteButton]} onPress={handleDelete}>
                    <Text style={styles.actionText}>🗑️ Remove Custom</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    centered: { flex: 1, justifyContent: "center", alignItems: "center" },
    backButton: { marginBottom: 12 },
    backIcon: { fontSize: 26, color: "#555" },
    image: { width: "100%", height: 200, borderRadius: 12, marginBottom: 16 },
    title: { fontSize: 28, fontWeight: "bold", marginBottom: 8 },
    summaryCard: { flexDirection: "row", backgroundColor: "#fff", padding: 12, borderRadius: 12, marginBottom: 16, elevation: 2 },
    summaryLeft: { flex: 1, gap: 4 },
    summaryText: { fontSize: 14, color: "#333" },
    subtitle: { fontSize: 22, fontWeight: "bold", marginTop: 16, marginBottom: 8 },
    description: { fontSize: 16, color: "#444", marginBottom: 16 },
    workoutItem: { backgroundColor: "#f5f5f5", borderRadius: 8, padding: 12, marginBottom: 8 },
    workoutName: { fontSize: 22, fontWeight: "600", marginBottom: 6 },
    workoutDataRow: { flexDirection: "row", gap: 16 },
    workoutImage: {
        width: "100%",
        height: 160,
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: "#ddd",
    },
    workoutData: { fontSize: 18, color: "#666" },
    actionButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 24, gap: 12 },
    actionButton: { flex: 1, padding: 12, borderRadius: 8, alignItems: "center" },
    editButton: { backgroundColor: "#3b82f6" },
    deleteButton: { backgroundColor: "#ef4444" },
    actionText: { fontWeight: "bold", fontSize: 16, color: "#fff" }
})