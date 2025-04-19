import { useState } from "react"
import { useRouter } from "expo-router"
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    Pressable
} from "react-native"

import createWorkout from "@/services/workouts/createWorkout"
import { FontAwesome5 } from "@expo/vector-icons"

export default function CreateWorkout() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [muscleGroup, setMuscleGroup] = useState("")
    const [type, setType] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = () => {
        if (!name || !muscleGroup || !type || !difficulty || !description) {
            return Alert.alert("Error", "All fields are required")
        }

        createWorkout("userid-placeholder", name, muscleGroup, description)
            .then(() => {
                Alert.alert("Workout created!", "Your workout has been submitted.")
                router.back()
            })
            .catch(error => {
                console.error(error)
                Alert.alert("Error", error.message || "Something went wrong.")
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
            <TextInput style={styles.input} value={muscleGroup} onChangeText={setMuscleGroup} />

            <Text style={styles.label}>Type</Text>
            <TextInput style={styles.input} value={type} onChangeText={setType} />

            <Text style={styles.label}>Difficulty</Text>
            <TextInput style={styles.input} value={difficulty} onChangeText={setDifficulty} />

            <Text style={styles.label}>Description</Text>
            <TextInput
                style={[styles.input, styles.textarea]}
                multiline
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
            />

            <View style={styles.imageRow}>
                <TouchableOpacity style={styles.imageBox}>
                    <Text style={styles.imageText}>+ Add Image</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageBox}>
                    <Text style={styles.imageText}>+ Add Image</Text>
                </TouchableOpacity>
            </View>

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
    textarea: {
        height: 100,
        textAlignVertical: "top"
    },
    imageRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24
    },
    imageBox: {
        backgroundColor: "#f2f2f2",
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 32,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    imageText: {
        color: "#555"
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