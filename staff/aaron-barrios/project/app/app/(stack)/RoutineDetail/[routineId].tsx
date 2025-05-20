import { useEffect, useState } from "react"
import { useLocalSearchParams, useRouter } from "expo-router"
import {
    ActivityIndicator,
    Image,
    ScrollView,
    Pressable,
    Alert,
    Text,
    View
} from "react-native"

import {
    getRoutineById,
    toggleLikeRoutine,
    toggleSaveRoutine,
    reviewRoutine,
    saveCustomRoutine
} from "@/services/routines"

import { RoutineType } from "com/types"
import { getUserRole, getCurrentUser } from "@/services/user"
import { getMyCustomRoutines, deleteCustomRoutine } from "@/services/routines"

import { styles } from "@/styles/routineDetail"

export default function RoutineDetail() {
    const { routineId } = useLocalSearchParams<{ routineId: string }>()
    const router = useRouter()

    const [routine, setRoutine] = useState<RoutineType | null>(null)
    const [loading, setLoading] = useState(true)
    const [toggle, setToggle] = useState(false)
    const [role, setRole] = useState<string | null>(null)

    const [userId, setUserId] = useState<string | null>(null)
    const [alreadyCustomized, setAlreadyCustomized] = useState(false)
    const [customRoutineId, setCustomRoutineId] = useState<string>("")


    const fetchRoutine = () => {
        if (!routineId) return
        setLoading(true)
        getRoutineById(routineId)
            .then(setRoutine)
            .catch(error => console.error("Error loading routine:", error))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getUserRole().then(data => setRole(data?.role || null))
    }, [])

    useEffect(() => {
        fetchRoutine()
    }, [routineId])


    useEffect(() => {
        getCurrentUser()
            .then(user => setUserId(user.id))
            .catch(error => {
                console.error("Error loading userId:", error)
                setUserId(null)
            })
    }, [])

    useEffect(() => {
        if (!routineId || !userId) return

        getMyCustomRoutines()
            .then(customs => {
                const matched = customs.find(c => c.originalRoutineId === routineId)
                setAlreadyCustomized(!!matched)
                setCustomRoutineId(matched?.id || "")
            })
            .catch(err => console.error("Error checking if routine is already customized:", err))
    }, [routineId, userId])


    const handleToggleLike = () => {
        if (!routineId) return
        setToggle(true)
        toggleLikeRoutine(routineId)
            .then(fetchRoutine)
            .finally(() => setToggle(false))
    }

    const handleToggleSave = () => {
        if (!routineId) return
        setToggle(true)
        toggleSaveRoutine(routineId)
            .then(fetchRoutine)
            .finally(() => setToggle(false))
    }

    const handleReview = (status: "accepted" | "declined") => {
        if (!routineId) return
        reviewRoutine(routineId, status)
            .then(() => router.back())
            .catch(error => console.error("Review error:", error))
    }

    const handleSaveCustomRoutine = () => {
        if (!routineId || !userId) return

        saveCustomRoutine(userId, routineId)
            .then(() => {
                router.back()

                setTimeout(() => {
                    Alert.alert(
                        "Rutina personalizada",
                        "Se ha guardado en tu perfil como rutina personalizada. 🎯"
                    )
                }, 300)
            })
            .catch(error => {
                console.error("[handleSaveCustomRoutine] Error al personalizar:", error)
                const errorMessage = error instanceof Error ? error.message : "No se pudo personalizar la rutina."
                Alert.alert("Error", errorMessage)
            })
    }



    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#888" />
            </View>
        )
    }

    if (!routine) {
        return (
            <View style={styles.centered}>
                <Text>Routine not found</Text>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{routine.name}</Text>
                <Pressable onPress={() => router.back()}>
                    <Image
                        source={require("@/assets/icons/back.png")}
                        style={{ width: 22, height: 22, tintColor: "#fff" }}
                    />
                </Pressable>
            </View>

            {/* Feed Image */}
            <Image source={{ uri: routine.feedImage }} style={styles.image} />


            {/* Summary Card */}
            <View style={styles.summaryCard}>
                <View style={styles.summaryLeft}>
                    {/* <Text style={styles.summaryText}>📍 {routine.locationType || "Gym"}</Text> */}
                    <Text style={styles.summaryText}>💪 Muscle Group: {routine.muscleGroup}</Text>
                    <Text style={styles.summaryText}>🔥 Difficulty: {routine.difficulty || "Intermediate"}</Text>
                    <Text style={styles.summaryText}>🕒 Duration: {routine.duration.toString()} min</Text>
                    {/* Frecuencia sugerida si la tuvieras */}
                    {/* <Text style={styles.summaryText}>📅 x3 per week</Text> */}
                </View>

                <View style={styles.summaryRight}>
                    <Pressable
                        onPress={handleToggleLike}
                        disabled={toggle || routine.status !== "accepted" || role !== "regular"}>
                        <Text style={styles.icon}>{routine.likedByMe ? "❤️" : "🤍"} {routine.likesCount}</Text>
                    </Pressable>
                    <Pressable
                        onPress={handleToggleSave}
                        disabled={toggle || routine.status !== "accepted" || role !== "regular"}>
                        <Text style={styles.icon}>{routine.savedByMe ? "📜" : "📃"} {routine.savesCount}</Text>
                    </Pressable>
                </View>
            </View>

            {/* Description */}
            <Text style={styles.subtitle}>Description</Text>
            <Text style={styles.description}>{routine.description}</Text>

            {/* Workouts List */}
            <Text style={styles.subtitle}>Workouts</Text>
            {routine.workouts.map((rw, index) => (
                <Pressable
                    key={index}
                    onPress={() =>
                        router.push({
                            pathname: "/(stack)/WorkoutDetail/[workoutId]",
                            params: { workoutId: rw.workout.id }
                        })
                    }
                    style={styles.workoutItem}
                >
                    <Text style={styles.workoutName}>{rw.workout.name}</Text>
                    {rw.workout.feedImage && (
                        <Image
                            source={{ uri: rw.workout.feedImage }}
                            style={styles.workoutImage}
                        />
                    )}
                    <View style={styles.workoutDataRow}>
                        <Text style={styles.workoutData}>{rw.sets} sets</Text>
                        <Text style={styles.workoutData}>{rw.reps} reps</Text>
                        <Text style={styles.workoutData}>{rw.weight} kg</Text>
                        <Text style={styles.workoutData}>{rw.restTime}" rest</Text>
                    </View>
                </Pressable>
            ))}


            {/* Customize Button (only if accepted) */}
            {routine.status === "accepted" && userId && role === "regular" && (
                alreadyCustomized ? (
                    <Pressable
                        style={[styles.customizeButton, { backgroundColor: "#ef4444" }]}
                        onPress={() => {
                            deleteCustomRoutine(customRoutineId!)
                                .then(() => {
                                    setAlreadyCustomized(false)
                                    router.back()
                                    Alert.alert("Removed", "Custom routine deleted.")
                                })
                                .catch(error => {
                                    console.error("Error removing custom routine:", error)
                                    Alert.alert("Error", "Could not remove custom routine.")
                                })
                        }}
                    >
                        <Text style={styles.customizeButtonText}>Remove Custom</Text>
                    </Pressable>
                ) : (
                    <Pressable
                        style={styles.customizeButton}
                        onPress={handleSaveCustomRoutine}
                    >
                        <Text style={styles.customizeButtonText}>Custom Routine</Text>
                    </Pressable>
                )
            )}


            {/* Review Actions (Moderators Only) */}
            {role === "mod" && routine.status === "pending" && (
                <View style={styles.reviewActions}>
                    <Pressable style={[styles.reviewButton, styles.acceptBtn]} onPress={() => handleReview("accepted")}>
                        <Text style={styles.reviewText}>✅ Accept</Text>
                    </Pressable>
                    <Pressable style={[styles.reviewButton, styles.declineBtn]} onPress={() => handleReview("declined")}>
                        <Text style={styles.reviewText}>❌ Decline</Text>
                    </Pressable>
                </View>
            )}
        </ScrollView>
    )
}