import { useEffect, useState } from "react"
import { useRouter } from "expo-router"
import {
    FlatList,
    Image,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
    Pressable,
    Button,
    Platform
} from "react-native"
import { Picker } from "@react-native-picker/picker"
import { Text, View } from "@/components/Themed"

import getAllWorkouts from "@/services/workouts/getAllWorkouts"
import { WorkoutType } from "com/types"

export default function Workouts() {
    const router = useRouter()
    const [workouts, setWorkouts] = useState<WorkoutType[]>([])
    const [loading, setLoading] = useState(true) //=> state to control first entry to the screen
    const [refreshing, setRefreshing] = useState(false) //=> state to control refreshes (pulls) to the screen
    const [selectedGroup, setSelectedGroup] = useState<string>("") //=> state to control filters applied to the screen

    const loadWorkouts = () => {
        setLoading(true)
        getAllWorkouts()
            .then(data => setWorkouts(data))
            .catch(error => console.error("Failed to fetch workouts:", error))
            .finally(() => setLoading(false))
    }

    const handleRefresh = () => {
        setRefreshing(true)
        getAllWorkouts()
            .then(data => setWorkouts(data))
            .catch(error => console.error("Failed to refresh workouts:", error))
            .finally(() => setRefreshing(false))
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
                        <Pressable onPress={() => item.id && router.push(`/(stack)/WorkoutDetail/${item.id}` as any)}>
                            <View style={styles.card}>
                                <Image
                                    style={styles.image}
                                    source={{ uri: item.feedImage ?? "https://via.placeholder.com/120" }}
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
                        </Pressable>
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
        fontSize: 32,
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
    card: {
        flexDirection: "row",
        marginBottom: 16,
        backgroundColor: "#eee",
        borderRadius: 16,
        padding: 16,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: 100,
        height: 100,
        backgroundColor: "#bbb",
        borderRadius: 12,
        marginRight: 16,
    },
    info: {
        flex: 1,
    },
    name: {
        fontWeight: "bold",
        fontSize: 18,
    },
    stats: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },
})