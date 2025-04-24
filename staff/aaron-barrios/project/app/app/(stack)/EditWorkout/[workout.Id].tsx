import { useState, useEffect } from "react"
import { Text, TextInput, ScrollView, Button, StyleSheet, Pressable, Image } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"

import { getWorkoutById, editWorkout } from "@/services/workouts"
import { WorkoutType, EditWorkoutType } from "com/types"
import { View } from "@/components/Themed"

export default function EditWorkout() {
    const { workoutId } = useLocalSearchParams<{ workoutId: string }>()
    const router = useRouter()

    const [form, setForm] = useState<EditWorkoutType>({
        name: "",
        muscleGroup: "",
        feedImage: "",
        type: "",
        difficulty: "",
        description: "",
        executionImages: [],
    })

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        getWorkoutById(workoutId)
            .then((data: WorkoutType) => {
                setForm({
                    name: data.name,
                    muscleGroup: data.muscleGroup,
                    feedImage: data.feedImage,
                    type: data.type,
                    difficulty: data.difficulty,
                    description: data.description,
                    // executionImages: data.executionImages || [],
                })
                setLoading(false)
            })
            .catch(() => {
                setError("Could not load workout")
                setLoading(false)
            })
    }, [])

    const handleChange = (field: keyof EditWorkoutType, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }))
    }

    const handleSave = () => {
        editWorkout(workoutId, form)
            .catch(() => setError("Error when saving changes"))
            .then(() => router.back())
    }

    if (loading) return <Text style={styles.loading}>Loading...</Text>
    if (error) return <Text style={styles.error}>{error}</Text>

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>✏️ Editing: {form.name}</Text>

                <Pressable onPress={() => router.back()}>
                    <Text style={styles.backButton}>← Back</Text>
                </Pressable>
            </View>

            <Image source={{ uri: form.feedImage }} style={styles.previewImage} />

            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} value={form.name} onChangeText={v => handleChange("name", v)} />

            <Text style={styles.label}>Muscle Group</Text>
            <TextInput style={styles.input} value={form.muscleGroup} onChangeText={v => handleChange("muscleGroup", v)} />

            <Text style={styles.label}>Feed Image</Text>
            <TextInput style={styles.input} value={form.feedImage} onChangeText={v => handleChange("feedImage", v)} />

            <Text style={styles.label}>Type</Text>
            <TextInput style={styles.input} value={form.type} onChangeText={v => handleChange("type", v)} />

            <Text style={styles.label}>Difficulty</Text>
            <TextInput style={styles.input} value={form.difficulty} onChangeText={v => handleChange("difficulty", v)} />

            <Text style={styles.label}>Description</Text>
            <TextInput
                style={[styles.input, styles.textarea]}
                multiline
                value={form.description}
                onChangeText={v => handleChange("description", v)}
            />

            <View style={styles.saveButtonContainer}>
                <Button title="✅ Save Changes" onPress={handleSave} color="#22c55e" />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    backButton: {
        fontSize: 16,
        color: "#0ea5e9",
        fontWeight: "bold",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        flexShrink: 1,
        textAlign: "right",
        marginLeft: 8,
    },
    previewImage: {
        width: "100%",
        height: 180,
        borderRadius: 10,
        marginBottom: 16,
    },
    label: {
        fontWeight: "bold",
        marginBottom: 4,
        marginTop: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 8,
    },
    textarea: {
        minHeight: 80,
        textAlignVertical: "top",
    },
    saveButtonContainer: {
        marginTop: 24,
        marginBottom: 40,
    },
    loading: {
        padding: 20,
        fontSize: 16,
        textAlign: "center",
    },
    error: {
        padding: 20,
        fontSize: 16,
        color: "red",
        textAlign: "center",
    },
})