import { Image, Pressable, View, Text } from "react-native"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"

import type { WorkoutType } from "com/types"
import formatDate from "@/utils/formatedDate"
import { getUserRole } from "@/services/user"

import { styles } from "@/styles/workoutCard"

type WorkoutCardProps = {
    workout: WorkoutType
    onPress: () => void
    onDelete?: () => void
    onReview?: (workoutId: string, status: "accepted" | "declined") => void
    showStatus?: boolean
    showAuthor?: boolean
}

export default function WorkoutCard({
    workout,
    onPress,
    onDelete,
    showStatus = false,
    showAuthor = false,
}: WorkoutCardProps) {
    const router = useRouter()

    const [role, setRole] = useState<string | null>(null)

    useEffect(() => {
        getUserRole().then(data => setRole(data?.role || null))
    }, [])

    return (
        <Pressable onPress={onPress} style={styles.card}>
            <Image
                style={styles.image}
                source={{
                    uri: workout.feedImage
                        ? `${workout.feedImage}?t=${(workout.modifiedAt || workout.createdAt || new Date()).toString()}`
                        : "https://via.placeholder.com/120"

                }}
            />

            <View style={styles.info}>
                <View style={styles.nameRow}>
                    <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                        {workout.name}
                    </Text>
                    {showStatus && role !== "mod" && (
                        <Text style={styles.status}>
                            {workout.status.charAt(0).toUpperCase() + workout.status.slice(1)}
                        </Text>
                    )}
                </View>


                <Text>{workout.muscleGroup}</Text>
                <Text>{workout.type}</Text>


                {showAuthor && (
                    <Pressable
                        disabled={workout.author.role === "default"}
                        onPress={() => {
                            if (workout.author.alias !== "default") {
                                router.push({
                                    pathname: "/(stack)/UserProfile/[id]",
                                    params: { id: workout.author.id },
                                })
                            }
                        }}
                    >
                        <Text style={workout.author.role === "default" ? styles.defaultAuthor : styles.authorLink}>
                            {workout.author.role === "default" ? "Default" : `@${workout.author.alias}`}
                        </Text>
                    </Pressable>
                )}

                <View style={styles.bottomRow}>
                    <Text style={styles.date}>📅 {formatDate(workout.createdAt)}</Text>
                    <View style={styles.actions}>
                        {workout.status === "pending" && role !== "mod" && (
                            <Pressable
                                onPress={() =>
                                    router.push({
                                        pathname: "/(stack)/EditWorkout/[workout.Id]",
                                        params: { workoutId: workout.id },
                                    })
                                }
                            >
                                <Text style={{ color: "#fff", fontWeight: "bold" }}>✏️</Text>
                            </Pressable>
                        )}

                        {workout.status === "accepted" && (
                            <>
                                <Text>{workout.likedByMe ? "❤️" : "🤍"} {workout.likesCount}</Text>
                                <Text>{workout.savedByMe ? "📜" : "📃"} {workout.savesCount}</Text>
                            </>
                        )}

                        {onDelete && (
                            <Pressable onPress={onDelete}>
                                <Text style={{ color: "#fff", fontWeight: "bold" }}>🗑️</Text>
                            </Pressable>
                        )}
                    </View>
                </View>

            </View>
        </Pressable >
    )
}