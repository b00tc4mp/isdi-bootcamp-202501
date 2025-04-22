import { useState, useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"
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

import { WorkoutType } from "com/types"
import WorkoutCard from "@/components/WorkoutCard"

import { filterWorkouts } from "@/services/workouts"


export default function Workouts() {
    const router = useRouter()
    const [workouts, setWorkouts] = useState<WorkoutType[]>([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState<string>("")
    const [filter, setFilter] = useState<"popular" | "saved" | "recent">("popular")

    const loadWorkouts = (selectedFilter = filter, muscleGroup = selectedGroup) => {
        setLoading(true)
        filterWorkouts(selectedFilter, muscleGroup || undefined)
            .then(setWorkouts)
            .catch(error => console.error("Failed to fetch workouts:", error))
            .finally(() => setLoading(false))
    }

    const handleRefresh = () => {
        setRefreshing(true)
        filterWorkouts(filter, selectedGroup || undefined)
            .then(setWorkouts)
            .catch(error => console.error("Failed to refresh workouts:", error))
            .finally(() => setRefreshing(false))
    }


    const handleWorkoutPress = (id: string) => {
        router.push(`/(stack)/WorkoutDetail/${id}` as any)
    }

    //=> useeffect se ejecuta post navegacion por lo que me refresca la lista filtrada 
    useFocusEffect(
        useCallback(() => {
            loadWorkouts()
        }, [filter, selectedGroup])
    )

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Feed Screen</Text>

            <View style={styles.dropdownContainer}>
                <Picker
                    selectedValue={selectedGroup}
                    onValueChange={(itemValue) => {
                        setSelectedGroup(itemValue)
                        loadWorkouts(filter, itemValue)
                    }}
                    style={styles.picker}
                >
                    <Picker.Item label="All Muscle Groups" value="" />
                    <Picker.Item label="Chest" value="chest" />
                    <Picker.Item label="Back" value="back" />
                    <Picker.Item label="Legs" value="legs" />
                    <Picker.Item label="Buttocks" value="buttocks" />
                    <Picker.Item label="Biceps" value="biceps" />
                    <Picker.Item label="Triceps" value="triceps" />
                    <Picker.Item label="Shoulders" value="shoulders" />
                </Picker>
            </View>

            <View style={styles.filters}>
                <FilterChip
                    label="Popular"
                    active={filter === "popular"}
                    onPress={() => {
                        setFilter("popular")
                    }}
                />
                <FilterChip
                    label="Most saved"
                    active={filter === "saved"}
                    onPress={() => {
                        setFilter("saved")
                    }}
                />
                <FilterChip
                    label="Recent"
                    active={filter === "recent"}
                    onPress={() => {
                        setFilter("recent")
                    }}
                />
            </View>

            <Button
                title="Create Workout"
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
                            showAuthor={true}
                            showStatus={false}
                        />
                    )}
                />
            )}
        </View>
    )
}

function FilterChip({ label, onPress, active }: { label: string; onPress: () => void; active?: boolean }) {
    return (
        <Button
            title={label}
            onPress={onPress}
            color={active ? "#facc15" : "#aaa"}
        />
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