import { Button, StyleSheet, Alert, ScrollView, Pressable, Image } from "react-native"
import { useFocusEffect, useRouter } from "expo-router"
import { useCallback, useEffect, useState } from "react"

import { Text, View } from "@/components/Themed"

import { RoutineType, WorkoutType } from "com/types"

import { deleteAnonymUser } from "@/services/user/anonym"
import { getAllRoutines } from "@/services/routines"
import { getUserRole } from "@/services/user"
import { getAllWorkouts } from "@/services/workouts"

export default function Anonym_Home() {
    const router = useRouter()

    const [Workouts, setWorkouts] = useState<WorkoutType[]>([])
    const [routines, setRoutines] = useState<RoutineType[]>([])

    useEffect(() => {
        getUserRole().then(data => {
            if (data?.role !== 'anonym') {
                router.replace('/(auth)')
            }
        })
    }, [])

    useFocusEffect(
        useCallback(() => {
            Promise.all([
                getAllWorkouts(),
                getAllRoutines()
            ])
                .then(([workouts, routines]) => {
                    setWorkouts(workouts)
                    setRoutines(routines)
                })
                .catch(error => {
                    console.error("Error loading home data:", error)
                })
        }, [])
    )

    const handleExit = () => {
        deleteAnonymUser()
            .then(() => {
                Alert.alert("Bye!", "Your anonymous session has ended.")
                router.replace("/(auth)")
            })
            .catch(error => {
                console.error(error)
                Alert.alert("Error", error.message || "Oops, couldn't exit anonymous mode.")
            })
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <View style={styles.header}>
                <Text style={styles.title}>Home</Text>
                <Button title="Exit" onPress={handleExit} />
            </View>

            <View style={styles.subheader}>
                <Pressable onPress={() => router.replace("/(auth)/Login")}>
                    <Text style={styles.link}>Already have an account? Log In</Text>
                </Pressable>
                <Text style={styles.guestTitle}>You are a guest!</Text>
            </View>


            <Text style={styles.sectionTitle}>Explore workouts and routines</Text>

            <Text style={styles.subtitle}>Suggested Workouts</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
                {Workouts.map(workout => (
                    <Pressable
                        key={workout.id}
                        onPress={() =>
                            router.push({ pathname: "/(stack)/WorkoutDetail/[workoutId]", params: { workoutId: workout.id } })
                        }
                        style={styles.cardMini}
                    >
                        <Image source={{ uri: workout.feedImage }} style={styles.cardMiniImage} />
                        <Text style={styles.cardMiniTitle}>{workout.name}</Text>
                    </Pressable>
                ))}
            </ScrollView>

            <Text style={styles.subtitle}>Suggested Routines</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
                {routines.map(routine => (
                    <Pressable
                        key={routine.id}
                        onPress={() =>
                            router.push({ pathname: "/(stack)/RoutineDetail/[routineId]", params: { routineId: routine.id } })
                        }
                        style={styles.cardMini}
                    >
                        <Image source={{ uri: routine.feedImage }} style={styles.cardMiniImage} />
                        <Text style={styles.cardMiniTitle}>{routine.name}</Text>
                    </Pressable>
                ))}
            </ScrollView>

        </ScrollView>
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
        alignSelf: "flex-start",
        marginBottom: 12
    },
    subheader: {
        marginTop: 8,
        marginBottom: 16,
        alignItems: "center",
    },
    link: {
        color: "#1e90ff",
        textDecorationLine: "underline",
        fontWeight: "600",
        fontSize: 20,
        marginBottom: 6,
    },
    guestTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#222",
    },
    header: {
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#444",
        marginBottom: 12
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    button: {
        marginBottom: 16
    },
    horizontalList: {
        flexDirection: "row",
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 24,
        marginBottom: 12,
    },
    cardMini: {
        width: 140,
        marginRight: 12,
        backgroundColor: "#eee",
        borderRadius: 12,
        overflow: "hidden",
    },
    cardMiniImage: {
        width: "100%",
        height: 80,
    },
    cardMiniTitle: {
        fontWeight: "600",
        fontSize: 14,
        padding: 8,
    }
})
