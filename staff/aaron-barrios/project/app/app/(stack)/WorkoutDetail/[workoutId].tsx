import { useEffect, useState } from "react"
import { useLocalSearchParams, useRouter } from "expo-router"
import { ActivityIndicator, Image, ScrollView, StyleSheet, Pressable } from "react-native"
import { Text, View } from "@/components/Themed"

import getWorkoutById from "@/services/workouts/getWorkoutById"
import { WorkoutType } from "com/types"

export default function WorkoutDetail() {
    const { workoutId } = useLocalSearchParams<{ workoutId: string }>()
    const router = useRouter()

    const [workout, setWorkout] = useState<WorkoutType | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (workoutId) {
            getWorkoutById(workoutId)
                .then(data => setWorkout(data))
                .catch(error => console.error("Error loading workout:", error))
                .finally(() => setLoading(false))
        }
    }, [workoutId])

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#888" />
            </View>
        )
    }

    if (!workout) {
        return (
            <View style={styles.centered}>
                <Text>Workout not found</Text>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            {/* Back Button */}
            <Pressable onPress={() => router.back()} style={styles.backButton}>
                <Text style={styles.backText}>← Back</Text>
            </Pressable>

            {/* Feed Image */}
            <Image
                source={{ uri: workout.feedImage }}
                style={styles.image}
            />

            {/* Info */}
            <Text style={styles.title}>{workout.name}</Text>
            <Text style={styles.subtitle}>💪 {workout.muscleGroup}</Text>
            <Text style={styles.subtitle}>🏷️ Type: {workout.type}</Text>
            <Text style={styles.subtitle}>🔥 Difficulty: {workout.difficulty}</Text>

            <Text style={styles.description}>{workout.description}</Text>

            {/* Stats */}
            <View style={styles.stats}>
                <Text>❤️ {workout.likesCount}</Text>
                <Text>🔖 {workout.savesCount}</Text>
            </View>
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
    backText: {
        fontSize: 16,
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
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 2,
    },
    description: {
        marginTop: 12,
        fontSize: 16,
        lineHeight: 22,
    },
    stats: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        paddingHorizontal: 4,
    },
})