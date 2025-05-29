import { Pressable, Image, Text, View } from "react-native"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"

import { RoutineType } from "com/types"

import formatDate from "@/utils/formatedDate"
import { getUserRole } from "@/services/user"

import { styles } from "@/styles/routineCard"

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

    const [role, setRole] = useState<string | null>(null)

    useEffect(() => {
        getUserRole().then(data => setRole(data?.role || null))
    }, [])

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
                <View style={styles.nameRow}>
                    <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                        {routine.name}
                    </Text>
                    {showStatus && (
                        <Text style={styles.status}>
                            {routine.status.charAt(0).toUpperCase() + routine.status.slice(1)}
                        </Text>
                    )}
                </View>

                <Text style={styles.d_info}>{routine.muscleGroup}</Text>
                <Text style={styles.d_info}>{routine.workouts.length} workouts </Text>
                <Text style={styles.d_info}>{routine.duration.toString()} min</Text>

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
                    <View style={styles.leftColumn}>
                        <Text style={styles.date}>📅 {formatDate(routine.createdAt)}</Text>
                    </View>

                    <View style={styles.actions}>
                        {routine.status === "pending" && role !== "mod" && (
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