import { useState, useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { useRouter } from "expo-router"
import {
    FlatList,
    ActivityIndicator,
    RefreshControl,
    StyleSheet,
    Platform,
} from "react-native"
import { Picker } from "@react-native-picker/picker"
import { Text, View } from "@/components/Themed"

import { RoutineType } from "com/types"
import RoutineCard from "@/components/RoutineCard"
import { filterRoutines } from "@/services/routines"

export default function Anon_Routines() {
    const router = useRouter()
    const [routines, setRoutines] = useState<RoutineType[]>([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState<string>("")

    const loadRoutines = (muscleGroup = selectedGroup) => {
        setLoading(true)
        filterRoutines("popular", muscleGroup || undefined)
            .then(setRoutines)
            .catch(error => console.error("Failed to fetch routines:", error))
            .finally(() => setLoading(false))
    }

    const handleRefresh = () => {
        setRefreshing(true)
        filterRoutines("popular", selectedGroup || undefined)
            .then(setRoutines)
            .catch(error => console.error("Failed to refresh routines:", error))
            .finally(() => setRefreshing(false))
    }

    const handleRoutinePress = (id: string) => {
        router.push(`/(stack)/RoutineDetail/${id}`)
    }

    useFocusEffect(
        useCallback(() => {
            loadRoutines()
        }, [selectedGroup])
    )

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Explore Routines</Text>

            <View style={styles.dropdownContainer}>
                <Picker
                    selectedValue={selectedGroup}
                    onValueChange={(itemValue) => {
                        setSelectedGroup(itemValue)
                        loadRoutines(itemValue)
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
                    data={routines}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                    renderItem={({ item }) => (
                        <RoutineCard
                            routine={item}
                            onPress={() => handleRoutinePress(item.id)}
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
    },
})