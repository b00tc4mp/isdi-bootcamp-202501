import { useEffect, useState } from "react"
import { useLocalSearchParams } from "expo-router"
import { ScrollView, StyleSheet, Pressable, ActivityIndicator } from "react-native"
import { Text, View } from "@/components/Themed"

import type { WorkoutType } from "com/types"
import WorkoutCard from "@/components/WorkoutCard"
import { getTargetUserData } from "@/services/user/regular"
import { getUserWorkouts } from "@/services/workouts"

export default function UserProfile() {
    const { id } = useLocalSearchParams()
    const targetUserId = typeof id === "string" ? id : ""

    const [activeTab, setActiveTab] = useState<"data" | "workouts" | "routines">("data")
    const [userAlias, setUserAlias] = useState<string>("")
    const [userData, setUserData] = useState<{
        name?: string
        lastName?: string
        alias: string
        email?: string
    }>({ alias: "" })
    const [workouts, setWorkouts] = useState<WorkoutType[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!targetUserId) return

        setLoading(true)
        getTargetUserData(targetUserId)
            .then(data => {
                setUserAlias(data.alias || "")
                setUserData(data)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [targetUserId])

    useEffect(() => {
        if (!targetUserId || activeTab !== "workouts") return

        setLoading(true)
        getUserWorkouts(targetUserId)
            .then(setWorkouts)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [targetUserId, activeTab])

    const handleTabChange = (tab: typeof activeTab) => {
        setActiveTab(tab)
        if (tab === "workouts") {
            setWorkouts([])
        }
    }

    if (!targetUserId) return <Text style={styles.error}>Invalid user ID</Text>
    if (loading && activeTab !== "data") return <ActivityIndicator style={{ marginTop: 40 }} />

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>@{userAlias}</Text>

            <View style={styles.tabs}>
                {["data", "workouts", "routines"].map(tab => (
                    <Pressable
                        key={tab}
                        style={[styles.tab, activeTab === tab && styles.activeTab]}
                        onPress={() => handleTabChange(tab as typeof activeTab)}
                    >
                        <Text>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
                    </Pressable>
                ))}
            </View>

            {activeTab === "data" && (
                <View style={styles.dataContainer}>
                    <Text style={styles.field}><Text style={styles.label}>Name:</Text> {userData.name || "-"}</Text>
                    <Text style={styles.field}><Text style={styles.label}>Last Name:</Text> {userData.lastName || "-"}</Text>
                    <Text style={styles.field}><Text style={styles.label}>Alias:</Text> {userData.alias}</Text>
                    <Text style={styles.field}><Text style={styles.label}>Email:</Text> {userData.email || "-"}</Text>
                </View>
            )}

            {activeTab === "workouts" && (
                <View style={{ marginTop: 12 }}>
                    {Array.isArray(workouts) && workouts.length > 0 ? (
                        workouts.map(workout => (
                            <WorkoutCard
                                key={workout.id}
                                workout={workout}
                                onPress={() => { }}
                                showStatus={false}
                                showAuthor={false}
                            />
                        ))
                    ) : (
                        <Text style={{ textAlign: "center", marginTop: 20 }}>No workouts found</Text>
                    )}
                </View>
            )}

            {activeTab === "routines" && (
                <Text style={{ marginTop: 20, textAlign: "center" }}>[TODO: Fetch and show user routines]</Text>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: "#f0f0f0",
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },
    tabs: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
        gap: 8
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: "#ddd",
        alignItems: "center"
    },
    activeTab: {
        backgroundColor: "#facc15",
    },
    dataContainer: {
        gap: 10
    },
    field: {
        fontSize: 14
    },
    label: {
        fontWeight: "bold"
    },
    error: {
        marginTop: 40,
        textAlign: "center",
        fontSize: 16,
        color: "red"
    }
})