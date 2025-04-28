import { useEffect, useState } from "react"
import { useRouter } from "expo-router"
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Pressable,
    Platform as RNPlatform,
    Alert as RNAlert,
    Image,
} from "react-native"
import { Picker } from "@react-native-picker/picker"
import { FontAwesome5 } from "@expo/vector-icons"

import { createRoutine } from "@/services/routines"
import { getAllWorkouts } from "@/services/workouts"
import { getCurrentUser } from "@/services/user"

import { RoutineWorkoutType, WorkoutType } from "com/types"

const showAlert = (title: string, message: string) => {
    if (RNPlatform.OS === "web") {
        window.alert(`${title}: ${message}`)
    } else {
        RNAlert.alert(title, message)
    }
}

export default function CreateRoutine() {
    const router = useRouter()

    const [name, setName] = useState("")
    const [muscleGroup, setMuscleGroup] = useState("chest")
    const [feedImage, setFeedImage] = useState("")
    const [duration, setDuration] = useState("")
    const [goal, setGoal] = useState("strength")
    const [difficulty, setDifficulty] = useState("easy")
    const [description, setDescription] = useState("")

    const [availableWorkouts, setAvailableWorkouts] = useState<WorkoutType[]>([])
    const [workouts, setWorkouts] = useState<RoutineWorkoutType[]>([])
    const [showWorkoutPicker, setShowWorkoutPicker] = useState(false)

    useEffect(() => {
        getAllWorkouts()
            .then(setAvailableWorkouts)
            .catch(error => console.error("Error fetching workouts:", error))
    }, [])

    const handleAddWorkout = (workoutId: string) => {
        const workout = availableWorkouts.find(w => w.id === workoutId)
        if (!workout) return

        setWorkouts(prev => [
            ...prev,
            {
                workout,
                sets: 3,
                reps: 10,
                weight: 0,
                restTime: 60,
                order: prev.length + 1
            }
        ])

        // 🔥 Eliminamos el workout añadido del selector
        setAvailableWorkouts(prev => prev.filter(w => w.id !== workoutId))
    }


    const handleRemoveWorkout = (indexToRemove: number) => {
        const workoutToRestore = workouts[indexToRemove].workout

        setWorkouts(prev => prev.filter((_, index) => index !== indexToRemove))

        // 🔥 Volvemos a agregarlo al selector disponible
        setAvailableWorkouts(prev => [...prev, workoutToRestore])
    }


    const updateWorkoutField = (index: number, field: keyof RoutineWorkoutType, value: string) => {
        const updated = [...workouts];
        (updated[index] as any)[field] = Number(value)
        setWorkouts(updated)
    }


    const handleSubmit = () => {
        if (!name.trim()) {
            return showAlert("Error", "Name is required")
        }
        if (!description.trim()) {
            return showAlert("Error", "Description is required")
        }
        if (!feedImage.trim()) {
            return showAlert("Error", "Feed image is required")
        }
        if (!duration.trim()) {
            return showAlert("Error", "Duration is required")
        }
        if (isNaN(Number(duration)) || Number(duration) <= 0) {
            return showAlert("Error", "Duration must be a positive number")
        }
        if (workouts.length < 4) {
            return showAlert("Error", "You must add at least 4 workouts")
        }

        getCurrentUser()
            .then(({ id }) => createRoutine(
                id,
                name,
                muscleGroup,
                feedImage,
                description,
                Number(duration),
                workouts
            ))
            .then(routine => {
                if (!routine) throw new Error("Routine creation failed")
                showAlert("Routine created!", "Your routine has been submitted.")
                router.replace("/(tabs)/Routines" as any)
            })
            .catch(error => {
                console.error("❌ Error en el flujo:", error)
                showAlert("Error", error.message || "Something went wrong.")
            })
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Create Routine</Text>

            <Pressable onPress={() => router.back()} style={{ position: "absolute", left: 16, top: 16 }}>
                <FontAwesome5 name="arrow-left" size={24} />
            </Pressable>

            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            <Text style={styles.label}>Muscle Group</Text>
            <View style={styles.pickerContainer}>
                <Picker selectedValue={muscleGroup} onValueChange={setMuscleGroup} style={styles.picker}>
                    <Picker.Item label="Chest" value="chest" />
                    <Picker.Item label="Back" value="back" />
                    <Picker.Item label="Legs" value="legs" />
                    <Picker.Item label="Biceps" value="biceps" />
                    <Picker.Item label="Triceps" value="triceps" />
                    <Picker.Item label="Buttocks" value="buttocks" />
                    <Picker.Item label="Shoulders" value="shoulders" />
                </Picker>
            </View>

            <Text style={styles.label}>Feed Image (URL)</Text>
            <TextInput style={styles.input} value={feedImage} onChangeText={setFeedImage} />

            <Text style={styles.label}>Goal</Text>
            <View style={styles.pickerContainer}>
                <Picker selectedValue={goal} onValueChange={setGoal} style={styles.picker}>
                    <Picker.Item label="Strength" value="strength" />
                    <Picker.Item label="Cardio" value="cardio" />
                    <Picker.Item label="Mobility" value="mobility" />
                    <Picker.Item label="Endurance" value="endurance" />
                </Picker>
            </View>

            <Text style={styles.label}>Duration (minutes)</Text>
            <TextInput
                style={styles.input}
                value={duration}
                onChangeText={setDuration}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Difficulty</Text>
            <View style={styles.pickerContainer}>
                <Picker selectedValue={difficulty} onValueChange={setDifficulty} style={styles.picker}>
                    <Picker.Item label="Easy" value="easy" />
                    <Picker.Item label="Medium" value="medium" />
                    <Picker.Item label="Hard" value="hard" />
                </Picker>
            </View>

            <Text style={styles.label}>Description</Text>
            <TextInput
                style={[styles.input, styles.textarea]}
                multiline
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
            />

            <Text style={styles.label}>Workouts</Text>

            <Pressable onPress={() => setShowWorkoutPicker(true)} style={styles.addButton}>
                <Text style={styles.addButtonText}>+ Add Workout</Text>
            </Pressable>

            {showWorkoutPicker && (
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue=""
                        onValueChange={(workoutId) => {
                            if (workoutId) {
                                handleAddWorkout(workoutId)
                                setShowWorkoutPicker(false)
                            }
                        }}
                    >
                        <Picker.Item label="Select a workout..." value="" />
                        {availableWorkouts.map(workout => (
                            <Picker.Item key={workout.id} label={workout.name} value={workout.id} />
                        ))}
                    </Picker>
                </View>
            )}

            {workouts.map((w, index) => (
                <View key={index} style={styles.workoutItem}>
                    {/* Imagen cuadrada a la izquierda */}
                    <Image
                        source={{ uri: w.workout.feedImage }}
                        style={styles.workoutImage}
                    />

                    {/* Datos del workout */}
                    <View style={{ flex: 1, marginLeft: 12 }}>
                        <View style={styles.workoutHeader}>
                            <Text style={styles.workoutName}>{w.workout.name}</Text>

                            {/* Botón para eliminar */}
                            <Pressable onPress={() => handleRemoveWorkout(index)} style={styles.deleteButton}>
                                <Text style={styles.deleteButtonText}>-</Text>
                            </Pressable>
                        </View>

                        {/* Inputs de sets, reps, weight, rest */}
                        <View style={styles.inputRow}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.smallLabel}>Sets</Text>
                                <TextInput
                                    style={styles.smallInput}
                                    value={w.sets.toString()}
                                    keyboardType="numeric"
                                    onChangeText={(text) => updateWorkoutField(index, 'sets', text)}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.smallLabel}>Reps</Text>
                                <TextInput
                                    style={styles.smallInput}
                                    value={w.reps.toString()}
                                    keyboardType="numeric"
                                    onChangeText={(text) => updateWorkoutField(index, 'reps', text)}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.smallLabel}>Weight</Text>
                                <TextInput
                                    style={styles.smallInput}
                                    value={w.weight?.toString() || "0"}
                                    keyboardType="numeric"
                                    onChangeText={(text) => updateWorkoutField(index, 'weight', text)}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.smallLabel}>Rest</Text>
                                <TextInput
                                    style={styles.smallInput}
                                    value={w.restTime.toString()}
                                    keyboardType="numeric"
                                    onChangeText={(text) => updateWorkoutField(index, 'restTime', text)}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            ))}


            <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                <Text style={styles.submitText}>Send</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: "#fff", flexGrow: 1 },
    title: { fontSize: 28, fontWeight: "bold", marginBottom: 24 },
    label: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
    input: { backgroundColor: "#f0f0f0", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 16 },
    pickerContainer: { backgroundColor: "#f0f0f0", borderRadius: 8, overflow: "hidden", marginBottom: 16 },
    picker: { height: RNPlatform.OS === "ios" ? 200 : 40, width: "100%" },
    textarea: { height: 100, textAlignVertical: "top" },
    submit: { backgroundColor: "#ccc", paddingVertical: 14, borderRadius: 8, alignItems: "center" },
    submitText: { fontSize: 16, fontWeight: "600" },
    addButton: { backgroundColor: "#ccc", paddingVertical: 14, marginBottom: 16, borderRadius: 8, alignItems: "center" },
    addButtonText: { fontSize: 16, fontWeight: "600" },
    workoutItem: {
        flexDirection: "row",
        backgroundColor: "#f0f0f0",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        alignItems: "center",
    },
    workoutImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: "#ddd", // fallback si la imagen tarda en cargar
    },
    workoutHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    workoutName: {
        fontSize: 16,
        fontWeight: "bold",
        flexShrink: 1, // Para que el nombre no empuje al botón
    },
    deleteButton: {
        backgroundColor: "#f87171", // rojo suave
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginLeft: 8,
    },
    deleteButtonText: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
    },
    inputRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
        marginTop: 8,
    },

    inputGroup: {
        flex: 1,
        alignItems: "center",
    },

    smallLabel: {
        fontSize: 12,
        fontWeight: "600",
        marginBottom: 4,
    },

    smallInput: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 6,
        textAlign: "center",
    },

})