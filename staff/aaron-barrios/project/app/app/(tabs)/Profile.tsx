import { useEffect, useState } from "react"
import { StyleSheet, TextInput, Button, Alert, Platform, ScrollView, Pressable } from "react-native"
import { View, Text } from "@/components/Themed"
import { router } from "expo-router"

import type { UserType, WorkoutType } from "com/types"
import WorkoutCard from "@/components/WorkoutCard"

import { getUserData, updateUserData, getMyWorkouts, getSavedWorkouts } from "@/services/user/regular"
import { deleteWorkout } from "@/services/workouts"


export default function Profile() {
    const [activeTab, setActiveTab] = useState<"user" | "workouts" | "routines">("user")
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [alias, setAlias] = useState("")
    const [email, setEmail] = useState("")
    const [currentUser, setCurrentUser] = useState<Omit<UserType, "id" | "createdAt"> | null>(null)

    const [loading, setLoading] = useState(true)
    const [workoutType, setWorkoutType] = useState<"saved" | "mine">("saved")
    const [workouts, setWorkouts] = useState<WorkoutType[]>([])

    const loadWorkouts = () => {
        const fetch = workoutType === "saved" ? getSavedWorkouts : getMyWorkouts
        fetch()
            .then(setWorkouts)
            .catch(error => {
                console.error("Error loading workouts:", error)
                showAlert("Error", error.message || "Failed to fetch workouts.")
            })
    }

    useEffect(() => {
        if (activeTab === "user") {
            setLoading(true)
            getUserData()
                .then(user => {
                    setName(user.name || "")
                    setLastName(user.lastName || "")
                    setAlias(user.alias || "")
                    setEmail(user.email || "")
                    setCurrentUser({
                        name: user.name || "",
                        lastName: user.lastName || "",
                        alias: user.alias || "",
                        email: user.email || "",
                        level: user.level,
                        interests: user.interests
                    })
                })
                .catch(error => {
                    console.error("Error loading user data:", error)
                    showAlert("Error", error.message || "Failed to fetch user data.")
                })
                .finally(() => setLoading(false))
        }
    }, [activeTab])

    useEffect(() => {
        if (activeTab === "workouts") loadWorkouts()
    }, [activeTab, workoutType])

    const showAlert = (title: string, message: string) => {
        if (Platform.OS === "web") {
            window.alert(`${title}: ${message}`)
        } else {
            Alert.alert(title, message)
        }
    }

    const handleUpdate = () => {
        if (!currentUser) {
            showAlert("Error", "User data not loaded yet.")
            return
        }

        const updates = { name, lastName, alias, email }

        updateUserData(updates, currentUser)
            .then(() => showAlert("Success", "User data updated successfully!"))
            .catch(error => showAlert("Error", error.message || "Update failed."))
    }

    const renderTabContent = () => {
        if (activeTab === "user") {
            return (
                <>
                    {/* Campos de usuario */}
                    <Text style={styles.label}>Name</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter your name" />
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="Enter your last name" />
                    <Text style={styles.label}>Alias</Text>
                    <TextInput style={styles.input} value={alias} onChangeText={setAlias} placeholder="Enter your alias" />
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter your email" keyboardType="email-address" />

                    <View style={styles.button}>
                        <Button title="Update Profile" onPress={handleUpdate} />
                    </View>

                    <Pressable style={styles.linkButton} onPress={() => router.push("/(stack)/ChangePassword")}>
                        <Text style={styles.linkText}>Change Password 🔐</Text>
                    </Pressable>
                </>
            )
        }

        if (activeTab === "workouts") {
            return (
                <>
                    <View style={styles.dropdownContainer}>
                        <Pressable
                            style={[styles.dropdownButton, workoutType === "saved" && styles.activeDropdown]}
                            onPress={() => setWorkoutType("saved")}
                        >
                            <Text>Saved</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.dropdownButton, workoutType === "mine" && styles.activeDropdown]}
                            onPress={() => setWorkoutType("mine")}
                        >
                            <Text>Mine</Text>
                        </Pressable>
                    </View>

                    {workouts.map(workout => {
                        const showDelete = workout.ownedByMe && workout.status === "pending"

                        return (
                            <WorkoutCard
                                key={workout.id}
                                workout={workout}
                                onPress={() => router.push(`/(stack)/WorkoutDetail/${workout.id}`)}
                                onDelete={
                                    showDelete
                                        ? () => deleteWorkout(workout.author.id, workout.id).then(loadWorkouts)
                                        : undefined
                                }
                                showStatus={workoutType === "mine"}
                                showAuthor={workoutType === "saved"}
                            />
                        )
                    })}
                </>
            )
        }

        if (activeTab === "routines") {
            return <Text style={{ marginTop: 20 }}>[Routines with dropdown - coming soon]</Text>
        }
    }

    if (loading && activeTab === "user") return null

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Your Profile</Text>

            <View style={styles.tabs}>
                <Pressable style={[styles.tab, activeTab === "user" && styles.activeTab]} onPress={() => setActiveTab("user")}>
                    <Text style={styles.tabText}>User Data</Text>
                </Pressable>
                <Pressable style={[styles.tab, activeTab === "workouts" && styles.activeTab]} onPress={() => setActiveTab("workouts")}>
                    <Text style={styles.tabText}>Workouts</Text>
                </Pressable>
                <Pressable style={[styles.tab, activeTab === "routines" && styles.activeTab]} onPress={() => setActiveTab("routines")}>
                    <Text style={styles.tabText}>Routines</Text>
                </Pressable>
            </View>

            {renderTabContent()}
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: "#f0f0f0",
        flexGrow: 1
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 4,
        marginTop: 12
    },
    input: {
        backgroundColor: "#fff",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 8,
    },
    button: {
        marginTop: 20,
    },
    tabs: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
        gap: 8
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: "#ddd",
        alignItems: "center"
    },
    activeTab: {
        backgroundColor: "#facc15",
    },
    tabText: {
        fontWeight: "600"
    },
    dropdownContainer: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 16
    },
    dropdownButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: "#ddd",
    },
    activeDropdown: {
        backgroundColor: "#facc15",
    },
    linkButton: {
        marginTop: 16,
        alignItems: "center",
    },
    linkText: {
        color: "#0ea5e9",
        fontWeight: "600",
        fontSize: 16,
    },
})