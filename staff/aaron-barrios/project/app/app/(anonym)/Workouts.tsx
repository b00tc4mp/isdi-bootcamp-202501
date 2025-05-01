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

import { WorkoutType } from "com/types"
import WorkoutCard from "@/components/WorkoutCard"
import { filterWorkouts } from "@/services/workouts"

export default function Anon_Workouts() {
    const router = useRouter()
    const [workouts, setWorkouts] = useState<WorkoutType[]>([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState<string>("")

    const loadWorkouts = (muscleGroup = selectedGroup) => {
        setLoading(true)
        filterWorkouts("popular", muscleGroup || undefined)
            .then(setWorkouts)
            .catch(error => console.error("Failed to fetch workouts:", error))
            .finally(() => setLoading(false))
    }

    const handleRefresh = () => {
        setRefreshing(true)
        filterWorkouts("popular", selectedGroup || undefined)
            .then(setWorkouts)
            .catch(error => console.error("Failed to refresh workouts:", error))
            .finally(() => setRefreshing(false))
    }

    const handleWorkoutPress = (id: string) => {
        router.push(`/(stack)/WorkoutDetail/${id}`)
    }

    useFocusEffect(
        useCallback(() => {
            loadWorkouts()
        }, [selectedGroup])
    )

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Explore Workouts</Text>

            <View style={styles.dropdownContainer}>
                <Picker
                    selectedValue={selectedGroup}
                    onValueChange={(itemValue) => {
                        setSelectedGroup(itemValue)
                        loadWorkouts(itemValue)
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

            {loading ? (
                <ActivityIndicator size="large" color="#888" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={workouts}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                    renderItem={({ item }) => (
                        <WorkoutCard
                            workout={item}
                            onPress={() => handleWorkoutPress(item.id)}
                            showAuthor={true}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
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
    list: {
        paddingBottom: 120,
    }
})