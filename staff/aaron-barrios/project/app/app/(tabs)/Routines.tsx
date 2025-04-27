import { useEffect, useState } from "react"
import { FlatList, StyleSheet, ActivityIndicator, Button } from "react-native"
import { useRouter } from "expo-router"
import { Text, View } from "@/components/Themed"

import { getAllRoutines } from "@/services/routines"
import { RoutineType } from "com/types"
import RoutineCard from "@/components/RoutineCard"

export default function Routines() {
    const router = useRouter()

    const [routines, setRoutines] = useState<RoutineType[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAllRoutines()
            .then(setRoutines)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Routines Feed</Text>

            <View style={styles.button}>
                <Button title="Create Routine" onPress={() => router.push("/(tabs)/Workout" as any)} />
            </View>

            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <FlatList
                    data={routines}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <RoutineCard
                            routine={item}
                            isDone={false} // o lógica futura de progreso
                            onPress={() => router.push(`/(tabs)/Routines`)}
                        // onPress={() => router.push(`/routine/${item.id}`)}
                        />
                    )}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#f0f0f0"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 12
    },
    button: {
        marginBottom: 16
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 2
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold"
    }
})