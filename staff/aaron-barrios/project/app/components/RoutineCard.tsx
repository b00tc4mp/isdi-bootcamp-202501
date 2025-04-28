import { Pressable, StyleSheet, Image } from "react-native"
import { Text, View } from "@/components/Themed"
import { useRouter } from "expo-router"
import { RoutineType } from "com/types"
import formatDate from "@/utils/formatedDate"

type RoutineCardProps = {
    routine: RoutineType
    onPress: () => void
    onDelete?: () => void
    showStatus?: boolean
    showAuthor?: boolean
}

export default function RoutineCard({
    routine,
    onPress,
    onDelete,
    showStatus = false,
    showAuthor = false,
}: RoutineCardProps) {
    const router = useRouter()

    return (
        <Pressable style={styles.card} onPress={onPress}>
            <Image
                style={styles.image}
                source={{
                    uri: routine.feedImage
                        ? `${routine.feedImage}?t=${(routine.modifiedAt || routine.createdAt || new Date()).toString()}`
                        : "https://via.placeholder.com/120"
                }}
            />

            <View style={styles.info}>
                <Text style={styles.name}>{routine.name}</Text>
                <Text>{routine.muscleGroup}</Text>
                <Text>{routine.workouts.length} workouts · {routine.duration.toString()} min</Text>

                {showAuthor && (
                    <Pressable
                        disabled={routine.author.role === "default"}
                        onPress={() => {
                            if (routine.author.role !== "default") {
                                router.push({
                                    pathname: "/(stack)/UserProfile/[id]",
                                    params: { id: routine.author.id },
                                })
                            }
                        }}
                    >
                        <Text style={routine.author.role === "default" ? styles.defaultAuthor : styles.authorLink}>
                            {routine.author.role === "default" ? "Default" : `@${routine.author.alias}`}
                        </Text>
                    </Pressable>
                )}


                <View style={styles.bottomRow}>
                    {showStatus && (
                        <Text style={styles.status}>
                            {routine.status.charAt(0).toUpperCase() + routine.status.slice(1)}
                        </Text>
                    )}

                    <View style={styles.actions}>
                        <Text style={styles.date}>📅 {formatDate(routine.createdAt)}</Text>
                        {routine.status === "pending" && (
                            <Pressable
                                onPress={() =>
                                    router.push({
                                        pathname: "/(stack)/EditRoutine/[routine.Id]",
                                        params: { routineId: routine.id },
                                    })
                                }
                            >
                                <Text style={{ color: "#fff", fontWeight: "bold" }}>✏️</Text>
                            </Pressable>
                        )}

                        {routine.status === "accepted" && (
                            <>
                                <Text>{routine.likedByMe ? "❤️" : "🤍"} {routine.likesCount}</Text>
                                <Text>{routine.savedByMe ? "📜" : "📃"} {routine.savesCount}</Text>
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
        </Pressable>
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
        height: 120,
        borderRadius: 10,
        marginRight: 12,
        backgroundColor: "#eee",
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
    date: {
        fontWeight: "600",
        fontSize: 10,
        marginTop: 4,
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
    icon: {
        fontSize: 13,
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
})