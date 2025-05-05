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
            <Text style={styles.header}>Routines Feed</Text>

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
        paddingHorizontal: 24,
        backgroundColor: "#fdfdfd",
    },
    header: {
        backgroundColor: "#222",
        paddingVertical: 32,
        paddingHorizontal: 24,
        marginBottom: 24,
        marginHorizontal: -24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 26,
    },
    dropdownContainer: {
        backgroundColor: "#eee",
        borderRadius: 8,
        marginBottom: 16,
        overflow: "hidden",
    },
    picker: {
        height: Platform.OS === "ios" ? 180 : 50,
        width: "100%",
        paddingVertical: 28,
    },
    list: {
        paddingBottom: 20,
    },
})