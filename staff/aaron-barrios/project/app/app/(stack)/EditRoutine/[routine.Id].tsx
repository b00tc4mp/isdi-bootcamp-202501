import { useState, useEffect } from "react"
import { Text, TextInput, ScrollView, Pressable, Image, Alert, View } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"

import { getRoutineById, editRoutine } from "@/services/routines"
import { RoutineType, EditRoutineType } from "com/types"

import { styles } from "@/styles/editRoutine"

export default function EditRoutine() {
    const { routineId } = useLocalSearchParams<{ routineId: string }>()
    const router = useRouter()

    const [form, setForm] = useState<EditRoutineType>({
        name: "",
        muscleGroup: undefined,
        feedImage: "",
        difficulty: "",
        description: "",
        duration: 1,
    })

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if (!routineId) return

        getRoutineById(routineId)
            .then((data: RoutineType) => {
                setForm({
                    name: data.name,
                    muscleGroup: data.muscleGroup,
                    feedImage: data.feedImage,
                    duration: Number(data.duration),
                    difficulty: data.difficulty,
                    description: data.description,
                })
            })
            .catch(() => {
                setError("Could not load routine")
            })
            .finally(() => setLoading(false))
    }, [routineId])

    const handleChange = (field: keyof EditRoutineType, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }))
    }

    const handleSave = () => {
        if (!routineId) return Alert.alert("Error", "Missing routine ID.")

        setSaving(true)
        editRoutine(routineId, form)
            .then(() => {
                Alert.alert("Success", "Routine updated successfully!")
                router.back()
            })
            .catch(() => {
                Alert.alert("Error", "Error when saving changes")
            })
            .finally(() => setSaving(false))
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
            <TextInput style={styles.input} value={form.muscleGroup ?? ""} onChangeText={v => handleChange("muscleGroup", v)} />

            <Text style={styles.label}>Feed Image</Text>
            <TextInput style={styles.input} value={form.feedImage} onChangeText={v => handleChange("feedImage", v)} />

            <Text style={styles.label}>Duration (minutes)</Text>
            <TextInput
                style={styles.input}
                value={(form.duration ?? 1).toString()}
                keyboardType="numeric"
                onChangeText={v => handleChange("duration", Number(v))}
            />

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
                <Pressable onPress={handleSave} disabled={saving}>
                    <Text style={styles.saveButtonText}>
                        {saving ? "Saving..." : "Save Changes"}
                    </Text>
                </Pressable>
            </View>

        </ScrollView>
    )
}