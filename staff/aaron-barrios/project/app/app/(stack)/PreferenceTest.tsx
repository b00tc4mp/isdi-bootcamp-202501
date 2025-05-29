import { useState } from "react"
import { View, Text, Pressable, ScrollView, Alert, Image } from "react-native"
import { router } from "expo-router"

import { getUserData, updateUserData } from "@/services/user/regular"

import { styles } from "@/styles/preferenceTest"

const GOALS = [
    { key: "endurance", label: "🔥 Increase endurance" },
    { key: "strength", label: "🏋️ Gain strength" },
    { key: "mobility", label: "🤸 Improve mobility" },
    { key: "cardio", label: "❤️ Enhance cardio" },
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

            <View style={styles.header}>
                <Text style={styles.title}>Preference test</Text>
                <Pressable onPress={() => router.back()}>
                    <Image
                        source={require("@/assets/icons/back.png")}
                        style={{ width: 22, height: 22, tintColor: "#fff" }}
                    />
                </Pressable>
            </View>
            <Text style={styles.subtitle}>¿Which is your main training goal or interest?</Text>

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
                <Text style={styles.saveText}>{saving ? "Saving..." : "Save preference"}</Text>
            </Pressable>
        </ScrollView>
    )
}