import { useEffect, useState } from "react"
import {
    Text,
    TextInput,
    ScrollView,
    Alert,
    View,
    Pressable,
    Image
} from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"

import { getCustomRoutineById, updateCustomRoutine } from "@/services/routines"
import { getCurrentUser } from "@/services/user"
import { RoutineType } from "com/types"

import { styles } from "@/styles/updateCustomRoutine"

export default function CustomRoutineEditor() {
    const { routineId } = useLocalSearchParams<{ routineId: string }>()
    const router = useRouter()

    const [routine, setRoutine] = useState<RoutineType | null>(null)
    const [userId, setUserId] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")


    useEffect(() => {
        if (!routineId) return

        getCurrentUser()
            .then(user => {
                setUserId(user.id)
            })
            .catch(() => {
                setUserId(null)
                setError("Could not load user")
            })
    }, [])

    useEffect(() => {
        if (!routineId || !userId) return

        getCustomRoutineById(routineId, userId)
            .then(customRoutine => {
                const adaptedRoutine: RoutineType = {
                    ...customRoutine,
                    status: "accepted",
                    likesCount: 0,
                    savesCount: 0,
                }

                setRoutine(adaptedRoutine)
            })
            .catch(() => setError("Could not load custom routine"))
            .finally(() => setLoading(false))
    }, [routineId, userId])


    const handleWorkoutChange = (index: number, field: "sets" | "reps" | "weight" | "restTime", value: number) => {
        setRoutine(prev => {
            if (!prev) return prev

            const updatedWorkouts = [...prev.workouts]
            updatedWorkouts[index] = {
                ...updatedWorkouts[index],
                [field]: value
            }

            return {
                ...prev,
                workouts: updatedWorkouts
            }
        })
    }

    const handleSave = () => {
        if (!routine || !routineId) return

        const updates = {
            workouts: routine.workouts.map(rw => ({
                workoutId: rw.workout.id,
                sets: rw.sets,
                reps: rw.reps,
                weight: rw.weight,
                restTime: rw.restTime,
                order: rw.order,
                time: rw.time
            }))
        }

        updateCustomRoutine(routineId, updates)
            .then(() => {
                Alert.alert("✅ Cambios guardados", "Tu rutina personalizada se ha actualizado correctamente.")
                router.back()
            })
            .catch(error => {
                console.error("[handleSave] error:", error)
                Alert.alert("Error", error.message || "No se pudo guardar la rutina.")
            })
    }

    if (loading) return <Text >Loading...</Text>
    if (error) return <Text>{error}</Text>
    if (!routine) return null

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Update Custom Routine</Text>
                <Pressable onPress={() => router.back()}>
                    <Image
                        source={require("@/assets/icons/back.png")}
                        style={{ width: 22, height: 22, tintColor: "#fff" }}
                    />
                </Pressable>
            </View>

            {/* Title */}
            <Text style={styles.title}>{routine.name}</Text>

            {/* Workouts Editable */}
            {routine.workouts.map((rw, index) => (
                <View key={index} style={styles.workoutCard}>
                    <Text style={styles.workoutTitle}>{rw.workout.name}</Text>

                    <Image source={{ uri: rw.workout.feedImage }} style={styles.workoutImage} />

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Sets</Text>
                        <TextInput
                            style={styles.input}
                            value={rw.sets.toString()}
                            keyboardType="numeric"
                            onChangeText={text => handleWorkoutChange(index, "sets", Number(text))}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Reps</Text>
                        <TextInput
                            style={styles.input}
                            value={rw.reps.toString()}
                            keyboardType="numeric"
                            onChangeText={text => handleWorkoutChange(index, "reps", Number(text))}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Weight (kg)</Text>
                        <TextInput
                            style={styles.input}
                            value={rw.weight.toString()}
                            keyboardType="numeric"
                            onChangeText={text => handleWorkoutChange(index, "weight", Number(text))}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Rest Time (s)</Text>
                        <TextInput
                            style={styles.input}
                            value={rw.restTime.toString()}
                            keyboardType="numeric"
                            onChangeText={text => handleWorkoutChange(index, "restTime", Number(text))}
                        />
                    </View>
                </View>
            ))}

            {/* Save Button */}
            <Pressable style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
            </Pressable>
        </ScrollView>
    )

}