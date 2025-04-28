import { useState, useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { useRouter } from "expo-router"
import {
    FlatList,
    ActivityIndicator,
    RefreshControl,
    StyleSheet,
    Platform,
    Pressable,
} from "react-native"
import { Picker } from "@react-native-picker/picker"
import { Text, View } from "@/components/Themed"

import { RoutineType } from "com/types"
import RoutineCard from "@/components/RoutineCard"
import { filterRoutines } from "@/services/routines"

export default function Routines() {
    const router = useRouter()
    const [routines, setRoutines] = useState<RoutineType[]>([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState<string>("")
    const [filter, setFilter] = useState<"popular" | "saved" | "recent">("popular")

    const loadRoutines = (selectedFilter = filter, muscleGroup = selectedGroup) => {
        setLoading(true)
        filterRoutines(selectedFilter, muscleGroup || undefined)
            .then(setRoutines)
            .catch(error => console.error("Failed to fetch routines:", error))
            .finally(() => setLoading(false))
    }

    const handleRefresh = () => {
        setRefreshing(true)
        filterRoutines(filter, selectedGroup || undefined)
            .then(setRoutines)
            .catch(error => console.error("Failed to refresh routines:", error))
            .finally(() => setRefreshing(false))
    }

    const handleRoutinePress = (id: string) => {
        router.push(`/(stack)/RoutineDetail/${id}` as any)
    }

    useFocusEffect(
        useCallback(() => {
            loadRoutines()
        }, [filter, selectedGroup])
    )

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Routines Feed</Text>

            <View style={styles.dropdownContainer}>
                <Picker
                    selectedValue={selectedGroup}
                    onValueChange={(itemValue) => {
                        setSelectedGroup(itemValue)
                        loadRoutines(filter, itemValue)
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
                <FilterChip label="Popular" active={filter === "popular"} onPress={() => setFilter("popular")} />
                <FilterChip label="Most saved" active={filter === "saved"} onPress={() => setFilter("saved")} />
                <FilterChip label="Recent" active={filter === "recent"} onPress={() => setFilter("recent")} />
            </View>

            <Pressable style={styles.createButton} onPress={() => router.push("/(stack)/CreateRoutine" as any)}>
                <Text style={styles.createButtonText}>Create Routine</Text>
            </Pressable>

            {loading ? (
                <ActivityIndicator size="large" color="#888" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={routines}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                    renderItem={({ item }) => (
                        <RoutineCard
                            routine={item}
                            onPress={() => handleRoutinePress(item.id)}
                            showAuthor={true}
                            showStatus={false}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    )
}

function FilterChip({ label, onPress, active }: { label: string; onPress: () => void; active?: boolean }) {
    return (
        <Pressable onPress={onPress} style={[styles.chip, active && styles.chipActive]}>
            <Text style={styles.chipText}>{label}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 24,
        backgroundColor: "#fefefe",
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 12,
    },
    dropdownContainer: {
        backgroundColor: "#eee",
        borderRadius: 8,
        marginBottom: 12,
        overflow: "hidden",
    },
    picker: {
        height: Platform.OS === "ios" ? 180 : 40,
        width: "100%",
    },
    filters: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 12,
        flexWrap: "wrap",
    },
    chip: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: "#ccc",
    },
    chipActive: {
        backgroundColor: "#facc15",
    },
    chipText: {
        fontWeight: "600",
        fontSize: 14,
    },
    list: {
        paddingBottom: 120,
    },
    createButton: {
        width: "100%",
        backgroundColor: "#0284c7",
        paddingVertical: 14,
        borderRadius: 10,
        marginBottom: 16,
        alignItems: "center",
    },
    createButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
})