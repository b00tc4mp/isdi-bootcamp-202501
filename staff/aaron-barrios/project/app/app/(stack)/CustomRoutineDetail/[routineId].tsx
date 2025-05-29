import { useEffect, useState } from "react"
import { useLocalSearchParams, useRouter } from "expo-router"
import { ActivityIndicator, Image, ScrollView, Pressable, Alert, View, Text } from "react-native"

import { getCustomRoutineById, deleteCustomRoutine } from "@/services/routines"
import { getCurrentUser } from "@/services/user"
import { CustomRoutineType } from "com/types"

import { styles } from "@/styles/customRoutineDetail"

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
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{routine.name}</Text>
                <Pressable onPress={() => router.back()}>
                    <Image
                        source={require("@/assets/icons/back.png")}
                        style={{ width: 22, height: 22, tintColor: "#fff" }}
                    />
                </Pressable>
            </View>


            {/* Feed Image */}
            <Image source={{ uri: routine.feedImage }} style={styles.image} />

            {/* Summary Card */}
            <View style={styles.summaryLeft}>
                <Text style={styles.summaryText}>💪 Muscle Group: {routine.muscleGroup}</Text>
                <Text style={styles.summaryText}>🔥 Difficulty: Intermediate</Text>
                <Text style={styles.summaryText}>🕒 Duration: {routine.duration.toString()} min</Text>
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
                    <Text style={styles.actionText}>Edit Routine</Text>
                </Pressable>

                <Pressable style={[styles.actionButton, styles.deleteButton]} onPress={handleDelete}>
                    <Text style={styles.actionText}>Remove Custom</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}