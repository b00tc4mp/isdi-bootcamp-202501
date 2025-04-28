import { useState, useEffect } from "react"
import { Text, TextInput, ScrollView, Button, StyleSheet, Pressable, Image, Alert } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"

import { getRoutineById, editRoutine } from "@/services/routines"
import { RoutineType, EditRoutineType } from "com/types"
import { View } from "@/components/Themed"

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
                <Text style={styles.title}>✏️ Editing: {form.name}</Text>

                <Pressable onPress={() => router.back()}>
                    <Text style={styles.backButton}>← Back</Text>
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
                <Button
                    title={saving ? "Saving..." : "✅ Save Changes"}
                    onPress={handleSave}
                    color="#22c55e"
                    disabled={saving}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: { padding: 16 },
    header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
    backButton: { fontSize: 16, color: "#0ea5e9", fontWeight: "bold" },
    title: { fontSize: 18, fontWeight: "bold", flexShrink: 1, textAlign: "right", marginLeft: 8 },
    previewImage: { width: "100%", height: 180, borderRadius: 10, marginBottom: 16 },
    label: { fontWeight: "bold", marginBottom: 4, marginTop: 12 },
    input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8 },
    textarea: { minHeight: 80, textAlignVertical: "top" },
    saveButtonContainer: { marginTop: 24, marginBottom: 40 },
    loading: { padding: 20, fontSize: 16, textAlign: "center" },
    error: { padding: 20, fontSize: 16, color: "red", textAlign: "center" },
})