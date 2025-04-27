import { Pressable, StyleSheet, Image } from "react-native"
import { Text, View } from "@/components/Themed"
import { useRouter } from "expo-router"
import { RoutineType } from "com/types"

type Props = {
    routine: RoutineType
    onPress: () => void
    isDone?: boolean // puedes usarlo si quieres marcar "Done"
}

export default function RoutineCard({ routine, onPress, isDone = false }: Props) {
    const router = useRouter()

    return (
        <Pressable style={styles.card} onPress={onPress}>
            <Image
                style={styles.image}
                source={{
                    uri: routine.feedImage || "https://via.placeholder.com/100"
                }}
            />

            <View style={styles.info}>
                <View style={styles.headerRow}>
                    <Text style={styles.name}>{routine.name}</Text>
                    {isDone && <Text style={styles.done}>Done</Text>}
                </View>

                <Text style={styles.subtitle}>{routine.muscleGroup}</Text>
                <Text style={styles.meta}>{routine.workouts.length} workouts</Text>
                <Text style={styles.meta}>{`${routine.duration} min`}</Text>

                <View style={styles.interactions}>
                    <Text style={styles.icon}>❤️ {routine.likesCount}</Text>
                    <Text style={styles.icon}>📌 {routine.savesCount}</Text>
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
        elevation: 1,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    info: {
        flex: 1,
        justifyContent: "space-between",
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        flex: 1,
    },
    done: {
        fontSize: 12,
        color: "#22c55e",
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 13,
        color: "#888",
        marginTop: 4,
    },
    meta: {
        fontSize: 13,
        color: "#333",
        marginTop: 2,
    },
    interactions: {
        flexDirection: "row",
        gap: 16,
        marginTop: 8,
    },
    icon: {
        fontSize: 13,
    },
})