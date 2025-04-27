import { useEffect, useState, useRef } from "react"
import { useLocalSearchParams, useRouter } from "expo-router"
import { ActivityIndicator, Image, ScrollView, StyleSheet, Pressable, FlatList, ViewToken, Dimensions } from "react-native"
import { Text, View } from "@/components/Themed"

import {
    getWorkoutById,
    toggleLikeWorkout,
    toggleSaveWorkout,
    reviewWorkout
} from "@/services/workouts/"

import defaultWorkoutExecutionImages from "@/constants/defaultWorkoutExecutionImages"
import { WorkoutType } from "com/types"
import { getUserRole } from "@/services/user"

const SCREEN_WIDTH = Dimensions.get("window").width

export default function WorkoutDetail() {
    const { workoutId } = useLocalSearchParams<{ workoutId: string }>()
    const router = useRouter()

    const [workout, setWorkout] = useState<WorkoutType | null>(null)
    const [loading, setLoading] = useState(true)
    const [toggle, setTogggle] = useState(false)
    const [role, setRole] = useState<string | null>(null)

    // const [currentImageIndex, setCurrentImageIndex] = useState(0)
    // const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current
    // const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    //     if (viewableItems.length > 0) {
    //         setCurrentImageIndex(viewableItems[0].index || 0)
    //     }
    // }).current

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
        setTogggle(true)
        toggleLikeWorkout(workoutId)
            .then(fetchWorkout)
            .finally(() => setTogggle(false))
    }

    const handleToggleSave = () => {
        if (!workoutId) return
        setTogggle(true)
        toggleSaveWorkout(workoutId)
            .then(fetchWorkout)
            .finally(() => setTogggle(false))
    }

    const handleReview = (status: "accepted" | "declined") => {
        if (!workoutId) return
        reviewWorkout(workoutId, status)
            .then(() => router.back())
            .catch(error => console.error("Review error:", error))
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

    // const finalImages = workout.executionImages?.length
    //     ? workout.executionImages
    //     : defaultWorkoutExecutionImages[workout.muscleGroup]

    return (
        <ScrollView style={styles.container}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
                <Text style={styles.backText}>← Back</Text>
            </Pressable>

            <Text style={styles.title}>{workout.name}</Text>
            <Image source={{ uri: workout.feedImage }} style={styles.image} />

            <View style={styles.stats}>
                <View style={{ flex: 1 }}>
                    {workout.author.role === "default" ? (
                        <Text style={styles.defaultAuthor}>Default</Text>
                    ) : (
                        <Pressable onPress={() => router.push({ pathname: "/(stack)/UserProfile/[id]", params: { id: workout.author.id } })}>
                            <Text style={styles.author}>@{workout.author.alias}</Text>
                        </Pressable>
                    )}
                </View>

                <View style={styles.rightStats}>
                    <Pressable onPress={handleToggleLike} disabled={toggle || workout.status !== "accepted"}>
                        <Text style={styles.icon}>{workout.likedByMe ? "❤️" : "🤍"} {workout.likesCount}</Text>
                    </Pressable>
                    <Pressable onPress={handleToggleSave} disabled={toggle || workout.status !== "accepted"}>
                        <Text style={styles.icon}>{workout.savedByMe ? "📜" : "📃"} {workout.savesCount}</Text>
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

            {/* {finalImages?.length > 0 && (
                <View style={styles.carousel}>
                    <FlatList
                        data={finalImages}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(_, index) => index.toString()}
                        onViewableItemsChanged={onViewableItemsChanged}
                        viewabilityConfig={viewabilityConfig}
                        renderItem={({ item }) => (
                            <Image
                                source={typeof item === "string" ? { uri: item } : item}
                                style={styles.executionImage}
                                resizeMode="cover"
                            />
                        )}
                    />
                    <View style={styles.indicatorRow}>
                        {finalImages.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.indicator,
                                    currentImageIndex === index && styles.activeIndicator,
                                ]}
                            />
                        ))}
                    </View>
                </View>
            )} */}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    backButton: {
        marginBottom: 12,
    },
    backText: {
        fontSize: 16,
        color: "#555",
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 4,
    },
    data: {
        fontSize: 16,
        color: "#666",
        marginBottom: 2,
    },
    subtitle: {
        marginTop: 12,
        marginBottom: 8,
        fontSize: 22,
        fontWeight: "bold",
        lineHeight: 22,
    },
    description: {
        marginTop: 12,
        fontSize: 16,
        lineHeight: 22,
    },
    stats: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: 4,
        gap: 8,
    },
    rightStats: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    author: {
        color: "#0ea5e9",
        fontWeight: "600",
        fontSize: 12,
        marginTop: 4,
    },
    defaultAuthor: {
        color: "#888",
        opacity: 0.7,
        fontStyle: "italic",
        fontSize: 12,
        marginTop: 4,
    },
    icon: {
        fontSize: 18,
    },
    reviewActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        gap: 12,
    },
    reviewButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    acceptBtn: {
        backgroundColor: "#3b944d",
    },
    declineBtn: {
        backgroundColor: "#a12828",
    },
    reviewText: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#fff",
    },
    carousel: {
        marginTop: 20,
    },
    executionImage: {
        width: SCREEN_WIDTH - 32,
        height: 220,
        borderRadius: 12,
        marginRight: 8,
        backgroundColor: "#f4f4f4",
    },
    indicatorRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 8,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#ccc",
        marginHorizontal: 4,
    },
    activeIndicator: {
        backgroundColor: "#0ea5e9",
    },
})