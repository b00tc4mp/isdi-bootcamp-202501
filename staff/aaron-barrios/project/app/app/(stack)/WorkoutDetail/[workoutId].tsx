import { useEffect, useState } from "react"
import { useLocalSearchParams, useRouter } from "expo-router"
import {
    ActivityIndicator,
    Image,
    ScrollView,
    Pressable,
    Dimensions,
    Text,
    View
} from "react-native"

import {
    getWorkoutById,
    toggleLikeWorkout,
    toggleSaveWorkout,
    reviewWorkout,
} from "@/services/workouts/"

import { WorkoutType } from "com/types"
import { getUserRole } from "@/services/user"

import { styles } from "@/styles/workoutDetail"

const SCREEN_WIDTH = Dimensions.get("window").width

export default function WorkoutDetail() {
    const { workoutId } = useLocalSearchParams<{ workoutId: string }>()
    const router = useRouter()

    const [workout, setWorkout] = useState<WorkoutType | null>(null)
    const [loading, setLoading] = useState(true)
    const [toggle, setToggle] = useState(false)
    const [role, setRole] = useState<string | null>(null)

    const fetchWorkout = () => {
        if (!workoutId) return
        setLoading(true)
        getWorkoutById(workoutId)
            .then(setWorkout)
            .catch(error => console.error("Error loading workout:", error))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getUserRole().then(data => setRole(data?.role || null))
    }, [])

    useEffect(() => {
        fetchWorkout()
    }, [workoutId])

    const handleToggleLike = () => {
        if (!workoutId) return
        setToggle(true)
        toggleLikeWorkout(workoutId).then(fetchWorkout).finally(() => setToggle(false))
    }

    const handleToggleSave = () => {
        if (!workoutId) return
        setToggle(true)
        toggleSaveWorkout(workoutId).then(fetchWorkout).finally(() => setToggle(false))
    }

    const handleReview = (status: "accepted" | "declined") => {
        if (!workoutId) return
        reviewWorkout(workoutId, status).then(() => router.back()).catch(console.error)
    }

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#888" />
            </View>
        )
    }

    if (!workout) {
        return (
            <View style={styles.centered}>
                <Text>Workout not found</Text>
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Workout Detail</Text>
                <Pressable onPress={() => router.back()}>
                    <Image
                        source={require("@/assets/icons/back.png")}
                        style={{ width: 22, height: 22, tintColor: "#fff" }}
                    />
                </Pressable>
            </View>

            <Text style={styles.title}>{workout.name}</Text>
            <Image source={{ uri: workout.feedImage }} style={styles.image} />

            <View style={styles.stats}>
                <View style={{ flex: 1 }}>
                    {workout.author.role === "default" ? (
                        <Text style={styles.defaultAuthor}>Default</Text>
                    ) : (
                        <Pressable
                            onPress={() =>
                                router.push({
                                    pathname: "/(stack)/UserProfile/[id]",
                                    params: { id: workout.author.id },
                                })
                            }
                        >
                            <Text style={styles.author}>@{workout.author.alias}</Text>
                        </Pressable>
                    )}
                </View>

                <View style={styles.rightStats}>
                    <Pressable
                        onPress={handleToggleLike}
                        disabled={toggle || workout.status !== "accepted" || role !== "regular"}
                    >
                        <Text style={styles.icon}>
                            {workout.likedByMe ? "❤️" : "🤍"} {workout.likesCount}
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={handleToggleSave}
                        disabled={toggle || workout.status !== "accepted" || role !== "regular"}
                    >
                        <Text style={styles.icon}>
                            {workout.savedByMe ? "📜" : "📃"} {workout.savesCount}
                        </Text>
                    </Pressable>
                </View>
            </View>

            <Text style={styles.subtitle}>Data</Text>
            <Text style={styles.data}>💪 Muscle Group: {workout.muscleGroup}</Text>
            <Text style={styles.data}>🏷️ Type: {workout.type}</Text>
            <Text style={styles.data}>🔥 Difficulty: {workout.difficulty}</Text>

            <Text style={styles.subtitle}>Description</Text>
            <Text style={styles.description}>{workout.description}</Text>

            {role === "mod" && workout.status === "pending" && (
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