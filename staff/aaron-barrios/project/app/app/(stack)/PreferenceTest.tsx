import { useState } from "react"
import { View, Text, Pressable, ScrollView, StyleSheet, Alert } from "react-native"
import { router } from "expo-router"

import { getUserData, updateUserData } from "@/services/user/regular"

const GOALS = [
    { key: "endurance", label: "🔥 Increase endurance" },
    { key: "strength", label: "🏋️ Gain strength" },
    { key: "mobility", label: "🤸 Improve mobility" },
    { key: "cardio", label: "❤️ Improve cardio" },
]

export default function PreferenceTest() {
    const [selected, setSelected] = useState<string | null>(null)
    const [saving, setSaving] = useState(false)

    const handleSave = () => {
        if (!selected) {
            Alert.alert("Selecciona un objetivo", "Debes elegir una opción antes de continuar.")
            return
        }

        setSaving(true)

        getUserData()
            .then(current => {
                return updateUserData({ ...current, interests: [selected] }, current)
            })
            .then(() => {
                Alert.alert("¡Guardado!", "Tu objetivo ha sido guardado correctamente.")
                router.replace("/(tabs)")
            })
            .catch(error => {
                console.error("Error saving preference:", error)
                Alert.alert("Error", error.message || "No se pudo guardar tu objetivo.")
            })
            .finally(() => setSaving(false))
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>¿Which is your main training goal or interest?</Text>

            <View style={styles.optionsContainer}>
                {GOALS.map(goal => (
                    <Pressable
                        key={goal.key}
                        style={[
                            styles.option,
                            selected === goal.key && styles.selectedOption,
                        ]}
                        onPress={() => setSelected(goal.key)}
                    >
                        <Text style={styles.optionText}>{goal.label}</Text>
                    </Pressable>
                ))}
            </View>

            <Pressable style={styles.saveButton} onPress={handleSave} disabled={saving}>
                <Text style={styles.saveText}>{saving ? "Guardando..." : "Guardar objetivo"}</Text>
            </Pressable>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: "#f0f0f0",
        flexGrow: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 24,
    },
    optionsContainer: {
        gap: 12,
        marginBottom: 24,
    },
    option: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: "#ddd",
        borderRadius: 10,
    },
    selectedOption: {
        backgroundColor: "#facc15",
    },
    optionText: {
        fontSize: 16,
        fontWeight: "600",
    },
    saveButton: {
        backgroundColor: "#10b981",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    saveText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
})