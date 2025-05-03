import { useState } from "react"
import { useRouter } from "expo-router"
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Pressable,
    Platform,
    Alert,
    Image,
} from "react-native"
import { Picker } from "@react-native-picker/picker"

import { createWorkout } from "@/services/workouts"
import { getCurrentUser } from "@/services/user"

import { styles } from "@/styles/createWorkout"

const showAlert = (title: string, message: string) => {
    if (Platform.OS === "web") {
        window.alert(`${title}: ${message}`)
    } else {
        Alert.alert(title, message)
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
            <View style={styles.header}>
                <Text style={styles.title}>Create Workout</Text>
                <Pressable onPress={() => router.back()}>
                    <Image
                        source={require("@/assets/icons/back.png")}
                        style={{ width: 22, height: 22, tintColor: "#fff" }}
                    />
                </Pressable>
            </View>

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