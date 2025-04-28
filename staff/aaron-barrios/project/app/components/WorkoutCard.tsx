import { Image, Pressable, StyleSheet } from "react-native"
import { View, Text } from "@/components/Themed"
import { useRouter } from "expo-router"

import type { WorkoutType } from "com/types"
import formatDate from "@/utils/formatedDate"

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
                <Text style={styles.name}>{workout.name}</Text>
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
                    {showStatus && (
                        <Text style={styles.status}>
                            {workout.status.charAt(0).toUpperCase() + workout.status.slice(1)}
                        </Text>
                    )}

                    <View style={styles.actions}>
                        <Text style={styles.date}>📅 {formatDate(workout.createdAt)}</Text>
                        {workout.status === "pending" && (
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

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 12,
    },
    info: {
        flex: 1,
        justifyContent: "center",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 6,
    },
    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 12,
    },
    status: {
        fontSize: 12,
        fontStyle: "italic",
        color: "#666",
    },
    actions: {
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
    },
    deleteIcon: {
        width: 20,
        height: 20,
        tintColor: "red",
    },
    authorLink: {
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
    date: {
        fontWeight: "600",
        fontSize: 10,
        marginTop: 4,
    },
    reviewActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
        gap: 8,
    },
    reviewButton: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: "center",
    },
    acceptBtn: {
        backgroundColor: "#22c55e",
    },
    declineBtn: {
        backgroundColor: "#ef4444",
    },
    reviewText: {
        color: "#fff",
        fontWeight: "bold",
    },
})