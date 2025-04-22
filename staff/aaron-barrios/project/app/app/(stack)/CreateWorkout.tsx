import { useState } from "react"
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
} from "react-native"
import { Picker } from "@react-native-picker/picker"
import { FontAwesome5 } from "@expo/vector-icons"

import { createWorkout } from "@/services/workouts"
import { getCurrentUser } from "@/services/session"

const showAlert = (title: string, message: string) => {
    if (RNPlatform.OS === "web") {
        window.alert(`${title}: ${message}`)
    } else {
        RNAlert.alert(title, message)
    }
}

export default function CreateWorkout() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [muscleGroup, setMuscleGroup] = useState("chest")
    const [feedImage, setFeedImage] = useState("")
    const [type, setType] = useState("strength")
    const [difficulty, setDifficulty] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = () => {
        if (!name.trim() || !description.trim() || !feedImage.trim()) {
            return showAlert("Error", "Name, description, and image are required")
        }

        getCurrentUser()
            .then(({ id }) => createWorkout(id, name, muscleGroup, feedImage, description))
            .then(workout => {
                if (!workout) throw new Error("Workout creation failed")

                showAlert("Workout created!", "Your workout has been submitted.")
                router.replace("/(tabs)/Workouts" as any)
            })
            .catch(error => {
                console.error("❌ Error en el flujo:", error)
                showAlert("Error", error.message || "Something went wrong.")
            })
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Create Workout</Text>
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

            <Text style={styles.label}>Feed Image</Text>
            <TextInput style={styles.input} value={feedImage} onChangeText={setFeedImage} />

            <Text style={styles.label}>Type</Text>
            <View style={styles.pickerContainer}>
                <Picker selectedValue={type} onValueChange={setType} style={styles.picker}>
                    <Picker.Item label="Strength" value="strength" />
                    <Picker.Item label="Cardio" value="cardio" />
                    <Picker.Item label="Mobility" value="mobility" />
                    <Picker.Item label="Endurance" value="endurance" />
                </Picker>
            </View>

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

            <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                <Text style={styles.submitText}>Send</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        flexGrow: 1
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 24
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 4
    },
    input: {
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 16
    },
    pickerContainer: {
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        overflow: "hidden",
        marginBottom: 16
    },
    picker: {
        height: RNPlatform.OS === "ios" ? 200 : 40,
        width: "100%",
    },
    textarea: {
        height: 100,
        textAlignVertical: "top"
    },
    submit: {
        backgroundColor: "#ccc",
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center"
    },
    submitText: {
        fontSize: 16,
        fontWeight: "600"
    }
})