import { useEffect, useState } from "react"
import { useRouter } from "expo-router"
import { FlatList, Image, StyleSheet, ActivityIndicator } from "react-native"
import { Text, View } from "@/components/Themed"
import { Button } from "react-native"

import { getAllWorkouts } from "@/services/workouts"
import { WorkoutType } from "com/types"

export default function Workouts() {
    const router = useRouter()
    const [workouts, setWorkouts] = useState<WorkoutType[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAllWorkouts()
            .then(data => setWorkouts(data))
            .catch(error => console.error("Failed to fetch workouts:", error))
            .finally(() => setLoading(false))
    }, [])

    return (
        <View style={styles.container} >
            <Text style={styles.title}> Workouts </Text>

            < View style={styles.dropdown} >
                <Text>Muscle Group ⌄</Text>
            </View>

            < View style={styles.filters} >
                <FilterChip label="Popular" />
                <FilterChip label="Most saved" />
                <FilterChip label="Recent" />
                <FilterChip label="Type" />
            </View>

            < Button title="+ Add Workout" /*onPress={() => router.push("/(tabs)/Workouts/Create")
            } *//>

            {
                loading ? (
                    <ActivityIndicator size="large" color="#888" style={{ marginTop: 20 }
                    } />
                ) : (
                    <FlatList
                        data={workouts}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.list}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Image
                                    style={styles.image}
                                    source={{ uri: item.images?.[0] ?? "https://via.placeholder.com/80" }}
                                />
                                <View style={styles.info}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text>{item.muscleGroup}</Text>
                                    <Text>{item.type}</Text>
                                    <View style={styles.stats}>
                                        <Text>❤️ {item.likesCount}</Text>
                                        <Text>🔖 {item.savesCount}</Text>
                                    </View>
                                </View>
                            </View>
                        )}

                    />
                )}
        </View>
    )
}

function FilterChip({ label }: { label: string }) {
    return (
        <View style={styles.chip} >
            <Text style={styles.chipText}> {label} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 16,
    },
    dropdown: {
        backgroundColor: "#ddd",
        padding: 8,
        borderRadius: 8,
        marginBottom: 12,
        alignSelf: "flex-start",
    },
    filters: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 16,
        flexWrap: "wrap",
    },
    chip: {
        backgroundColor: "#ccc",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    chipText: {
        fontSize: 14,
        fontWeight: "500",
    },
    list: {
        paddingBottom: 80,
    },
    card: {
        flexDirection: "row",
        marginBottom: 12,
        backgroundColor: "#eee",
        borderRadius: 12,
        padding: 12,
        alignItems: "center",
    },
    image: {
        width: 80,
        height: 80,
        backgroundColor: "#bbb",
        borderRadius: 8,
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    name: {
        fontWeight: "bold",
        fontSize: 16,
    },
    stats: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },
})