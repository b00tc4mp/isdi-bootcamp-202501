import { useEffect, useState } from "react"
import { useRouter } from "expo-router"
import {
    FlatList,
    ActivityIndicator,
    RefreshControl,
    Button,
    StyleSheet,
    Platform,
} from "react-native"
import { Picker } from "@react-native-picker/picker"
import { Text, View } from "@/components/Themed"

import getAllWorkouts from "@/services/workouts/getAllWorkouts"
import deleteWorkout from "@/services/workouts/deleteWorkout" // ← asegúrate de tener esta lógica
import { WorkoutType } from "com/types"
import WorkoutCard from "@/components/WorkoutCard"

export default function Workouts() {
    const router = useRouter()
    const [workouts, setWorkouts] = useState<WorkoutType[]>([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState<string>("")

    const loadWorkouts = () => {
        setLoading(true)
        getAllWorkouts()
            .then(setWorkouts)
            .catch(error => console.error("Failed to fetch workouts:", error))
            .finally(() => setLoading(false))
    }

    const handleRefresh = () => {
        setRefreshing(true)
        getAllWorkouts()
            .then(setWorkouts)
            .catch(error => console.error("Failed to refresh workouts:", error))
            .finally(() => setRefreshing(false))
    }

    const handleWorkoutPress = (id: string) => {
        router.push(`/(stack)/WorkoutDetail/${id}` as any)
    }

    const handleToggleLike = (id: string): Promise<void> => {
        console.log("❤️ Like toggled for workout:", id)
        return Promise.resolve() // Reemplaza con lógica real
    }

    const handleToggleSave = (id: string): Promise<void> => {
        console.log("🔖 Save toggled for workout:", id)
        return Promise.resolve() // Reemplaza con lógica real
    }

    useEffect(() => {
        loadWorkouts()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Feed Screen</Text>

            <View style={styles.dropdownContainer}>
                <Picker
                    selectedValue={selectedGroup}
                    onValueChange={(itemValue) => setSelectedGroup(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="All Muscle Groups" value="" />
                    <Picker.Item label="Chest" value="chest" />
                    <Picker.Item label="Back" value="back" />
                    <Picker.Item label="Legs" value="legs" />
                    <Picker.Item label="Buttocks" value="buttocks" />
                    <Picker.Item label="Arms" value="arms" />
                </Picker>
            </View>

            <View style={styles.filters}>
                <FilterChip label="Popular" />
                <FilterChip label="Most saved" />
                <FilterChip label="Recent" />
                <FilterChip label="Type" />
            </View>

            <Button
                title="+ Add Workout"
                onPress={() => router.push("/(stack)/CreateWorkout" as any)}
            />

            {loading ? (
                <ActivityIndicator size="large" color="#888" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={workouts}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                    }
                    renderItem={({ item }) => (
                        <WorkoutCard
                            workout={item}
                            onPress={() => handleWorkoutPress(item.id)}
                            onToggleLike={() => handleToggleLike(item.id)}
                            onToggleSave={() => handleToggleSave(item.id)}
                            showAuthor={true}
                            showStatus={false}
                        />
                    )}
                />
            )}
        </View>
    )
}

function FilterChip({ label }: { label: string }) {
    return (
        <View style={styles.chip}>
            <Text style={styles.chipText}>{label}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    dropdownContainer: {
        backgroundColor: "#ddd",
        borderRadius: 8,
        marginBottom: 12,
        alignSelf: "stretch",
        overflow: "hidden"
    },
    picker: {
        height: Platform.OS === "ios" ? 200 : 40,
        width: "100%",
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
})