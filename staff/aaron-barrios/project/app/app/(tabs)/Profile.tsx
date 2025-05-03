import { useCallback, useEffect, useState } from "react"
import { TextInput, Alert, Platform, ScrollView, Pressable, View, Text } from "react-native"
import { router, useFocusEffect } from "expo-router"

import type { RoutineType, UserType, WorkoutType } from "com/types"
import { CustomRoutineType } from "com/types"

import WorkoutCard from "@/components/WorkoutCard"
import RoutineCard from "@/components/RoutineCard"

import { getUserData, updateUserData, getMyWorkouts, getSavedWorkouts, getSavedRoutines, getMyRoutines } from "@/services/user/regular"
import { deleteWorkout } from "@/services/workouts"
import { deleteRoutine, getMyCustomRoutines } from "@/services/routines"

import { styles } from "@/styles/userProfile"


export default function Profile() {
    const [activeTab, setActiveTab] = useState<"user" | "workouts" | "routines" | "customRoutines">("user")
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [alias, setAlias] = useState("")
    const [email, setEmail] = useState("")
    const [level, setLevel] = useState("")
    const [interests, setInterests] = useState<string[]>([])
    const [currentUser, setCurrentUser] = useState<Omit<UserType, "id" | "createdAt"> | null>(null)

    const [loading, setLoading] = useState(true)
    const [workoutType, setWorkoutType] = useState<"saved" | "mine">("saved")
    const [workouts, setWorkouts] = useState<WorkoutType[]>([])

    const [routineType, setRoutineType] = useState<"saved" | "mine">("saved")
    const [routines, setRoutines] = useState<RoutineType[]>([])

    const [customRoutines, setCustomRoutines] = useState<CustomRoutineType[]>([])

    function appendImageTimestamp(url: string, dateStr?: string | Date) {
        const timestamp = new Date(dateStr ?? Date.now()).getTime()
        return `${url}?t=${timestamp}`
    }

    const showAlert = (title: string, message: string) => {
        if (Platform.OS === "web") {
            window.alert(`${title}: ${message}`)
        } else {
            Alert.alert(title, message)
        }
    }

    const loadWorkouts = () => {
        const fetch = workoutType === "saved" ? getSavedWorkouts : getMyWorkouts

        fetch()
            .then(data => {
                const workoutsWithTimestamp = data.map(workout => ({
                    ...workout,
                    feedImage: appendImageTimestamp(workout.feedImage, workout.modifiedAt || workout.createdAt),
                }))
                setWorkouts(workoutsWithTimestamp)
            })
            .catch(error => {
                console.error("Error loading workouts:", error)
                showAlert("Error", error.message || "Failed to fetch workouts.")
            })
    }

    const loadRoutines = () => {
        const fetch = routineType === "saved" ? getSavedRoutines : getMyRoutines

        fetch()
            .then(data => {
                const routinesWithTimestamp = data.map(routine => ({
                    ...routine,
                    feedImage: appendImageTimestamp(routine.feedImage, routine.modifiedAt || routine.createdAt),
                }))
                setRoutines(routinesWithTimestamp)
            })
            .catch(error => {
                console.error("Error loading routines:", error)
                showAlert("Error", error.message || "Failed to fetch routines.")
            })
    }


    const loadCustomRoutines = () => {
        getMyCustomRoutines()
            .then(data => setCustomRoutines(data))
            .catch(error => {
                console.error("Error loading custom routines:", error)
                showAlert("Error", error.message || "Failed to fetch custom routines.")
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
                    setLevel(user.level || "")
                    setInterests(user.interests || [])
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

    useEffect(() => {
        if (activeTab === "routines") loadRoutines()
    }, [activeTab, routineType])


    useFocusEffect(
        useCallback(() => {
            if (activeTab === "workouts" && workoutType === "mine") {
                loadWorkouts()
            }

            if (activeTab === "routines" && routineType === "mine") {
                loadRoutines()
            }

            if (activeTab === "routines" && routineType === "saved") {
                loadRoutines()
            }

            if (activeTab === "customRoutines") {
                loadCustomRoutines()
            }
        }, [activeTab, workoutType, routineType])
    )


    const handleUpdate = () => {
        if (!currentUser) {
            showAlert("Error", "User data not loaded yet.")
            return
        }

        const updates = { name, lastName, alias, email, level, interests }

        updateUserData(updates, currentUser)
            .then(() => showAlert("Success", "User data updated successfully!"))
            .catch(error => showAlert("Error", error.message || "Update failed."))
    }

    const renderTabContent = () => {
        if (activeTab === "user") {
            return (
                <>
                    <Text style={styles.label}>Name</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter your name" />
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="Enter your last name" />
                    <Text style={styles.label}>Alias</Text>
                    <TextInput style={styles.input} value={alias} onChangeText={setAlias} placeholder="Enter your alias" />
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter your email" keyboardType="email-address" />

                    <Text style={styles.label}>Level</Text>
                    <View style={styles.levelPicker}>
                        {["beginner", "intermediate", "veteran"].map(option => (
                            <Pressable
                                key={option}
                                onPress={() => setLevel(option)}
                                style={[styles.levelOption, level === option && styles.activeLevel]}
                            >
                                <Text>{option}</Text>
                            </Pressable>
                        ))}
                    </View>

                    <Text style={styles.label}>Interests</Text>
                    <View style={styles.interestsContainer}>
                        {[
                            "strength", "cardio", "mobility", "endurance"
                        ].map(interest => (
                            <Pressable
                                key={interest}
                                onPress={() =>
                                    setInterests(prev =>
                                        prev.includes(interest)
                                            ? prev.filter((i: string) => i !== interest)
                                            : [...prev, interest]
                                    )
                                }
                                style={[styles.interestOption, interests.includes(interest) && styles.activeInterest]}
                            >
                                <Text>{interest}</Text>
                            </Pressable>
                        ))}
                    </View>


                    <Pressable style={styles.button} onPress={handleUpdate}>
                        <Text style={styles.buttonText}>Update Profile</Text>
                    </Pressable>


                    <Pressable style={styles.linkButton} onPress={() => router.push("/(stack)/ChangePassword")}>
                        <Text style={styles.linkText}>Change Password </Text>
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
            return (
                <>
                    <View style={styles.dropdownContainer}>
                        <Pressable
                            style={[styles.dropdownButton, routineType === "saved" && styles.activeDropdown]}
                            onPress={() => setRoutineType("saved")}
                        >
                            <Text>Saved</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.dropdownButton, routineType === "mine" && styles.activeDropdown]}
                            onPress={() => setRoutineType("mine")}
                        >
                            <Text>Mine</Text>
                        </Pressable>
                    </View>

                    {routines.map(routine => {
                        const showDelete = routine.ownedByMe && routine.status === "pending"

                        return (
                            <RoutineCard
                                key={routine.id}
                                routine={routine}
                                onPress={() => router.push(`/(stack)/RoutineDetail/${routine.id}`)}
                                onDelete={showDelete
                                    ? () => deleteRoutine(routine.author.id, routine.id).then(loadRoutines)
                                    : undefined}
                                showStatus={routineType === "mine"}
                                showAuthor={routineType === "saved"}
                            />
                        )
                    })}

                </>
            )
        }

        if (activeTab === "customRoutines") {
            return (
                <>
                    {customRoutines.length === 0 ? (
                        <Text style={{ marginTop: 20, textAlign: "center" }}>
                            No custom routines yet. Customize one to get started!
                        </Text>
                    ) : (
                        customRoutines.map(customRoutine => (
                            <RoutineCard
                                key={customRoutine.id}
                                routine={customRoutine as any}
                                onPress={() => {
                                    router.push({
                                        pathname: "/(stack)/CustomRoutineDetail/[routineId]" as any,
                                        params: { routineId: customRoutine.id }
                                    })
                                }}
                                showStatus={false}
                                showAuthor={false}
                            />
                        ))

                    )}
                </>
            )
        }
    }

    if (loading && activeTab === "user") return null

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{alias}'s data</Text>

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
                <Pressable style={[styles.tab, activeTab === "customRoutines" && styles.activeTab]} onPress={() => setActiveTab("customRoutines")}>
                    <Text style={styles.tabText}>Custom</Text>
                </Pressable>
            </View>

            {renderTabContent()}
        </ScrollView>
    )
}