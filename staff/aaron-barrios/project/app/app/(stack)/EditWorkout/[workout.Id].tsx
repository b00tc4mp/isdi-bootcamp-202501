import { useState, useEffect } from "react"
import { Text, TextInput, ScrollView, Pressable, Image, View } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"

import { getWorkoutById, editWorkout } from "@/services/workouts"
import { WorkoutType, EditWorkoutType } from "com/types"

import { styles } from "@/styles/editWorkout"

export default function EditWorkout() {
    const { workoutId } = useLocalSearchParams<{ workoutId: string }>()
    const router = useRouter()

    const [form, setForm] = useState<EditWorkoutType>({
        name: "",
        muscleGroup: undefined,
        feedImage: "",
        type: undefined,
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
                <Text style={styles.title}>Editing: {form.name}</Text>

                <Pressable onPress={() => router.back()}>
                    <Image
                        source={require("@/assets/icons/back.png")}
                        style={{ width: 22, height: 22, tintColor: "#fff" }}
                    />
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
                <Pressable onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}