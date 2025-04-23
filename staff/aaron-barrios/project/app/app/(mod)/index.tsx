import { useEffect, useState } from "react"
import {
    ScrollView,
    Pressable,
    StyleSheet,
    FlatList,
    RefreshControl,
} from "react-native"
import { useRouter } from "expo-router"

import { Text, View } from "@/components/Themed"
import { getUserRole } from "@/services/session"

import getModeratorWorkouts from "@/services/workouts/getModeratorWorkouts"
import WorkoutCard from "@/components/WorkoutCard"
import { WorkoutType } from "com/types"

export default function Review() {
    const router = useRouter()

    const [workouts, setWorkouts] = useState<WorkoutType[]>([])
    const [refreshing, setRefreshing] = useState(false)
    const [activeTab, setActiveTab] = useState<"workouts" | "routines">("workouts")

    const fetchWorkouts = () => {
        setRefreshing(true)
        getModeratorWorkouts()
            .then(setWorkouts)
            .finally(() => setRefreshing(false))
    }

    useEffect(() => {
        getUserRole().then(data => {
            if (data?.role !== "mod") {
                router.replace("/(auth)")
            } else {
                fetchWorkouts()
            }
        })
    }, [])

    const handleWorkoutPress = (id: string) => {
        router.push(`/(stack)/WorkoutDetail/${id}` as any)
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <Text style={styles.title}>Review</Text>

            {/* Tabs */}
            <View style={styles.tabs}>
                <Pressable
                    style={[styles.tab, activeTab === "routines" && styles.tabInactive]}
                    onPress={() => setActiveTab("routines")}
                >
                    <Text style={activeTab === "routines" ? styles.tabTextActive : styles.tabText}>Routines</Text>
                </Pressable>
                <Pressable
                    style={[styles.tab, activeTab === "workouts" && styles.tabInactive]}
                    onPress={() => setActiveTab("workouts")}
                >
                    <Text style={activeTab === "workouts" ? styles.tabTextActive : styles.tabText}>Workouts</Text>
                </Pressable>
            </View>

            {activeTab === "workouts" ? (
                <FlatList
                    data={workouts}
                    keyExtractor={item => item.id}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchWorkouts} />}
                    renderItem={({ item }) => (
                        <WorkoutCard
                            workout={item}
                            onPress={() => handleWorkoutPress(item.id)}
                            showAuthor
                            showStatus
                        />
                    )}
                    contentContainerStyle={styles.list}
                />
            ) : (
                <Text style={styles.placeholder}>[TODO: Pending Routines Review]</Text>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 16,
    },
    tabs: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 16,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: "#e5e5e5",
        marginHorizontal: 4,
        borderRadius: 10,
        alignItems: "center",
    },
    tabInactive: {
        backgroundColor: "#aaa",
    },
    tabText: {
        fontWeight: "600",
        color: "#333",
    },
    tabTextActive: {
        fontWeight: "700",
        color: "#000",
    },
    list: {
        gap: 12,
        paddingBottom: 80,
    },
    placeholder: {
        marginTop: 32,
        textAlign: "center",
        color: "#888",
        fontStyle: "italic",
    },
})