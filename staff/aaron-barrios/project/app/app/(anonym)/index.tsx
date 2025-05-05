import { Alert, ScrollView, Pressable, Image, Text, View } from "react-native"
import { useFocusEffect, useRouter } from "expo-router"
import { useCallback, useEffect, useState } from "react"

import { RoutineType, WorkoutType } from "com/types"

import { deleteAnonymUser } from "@/services/user/anonym"
import { getAllRoutines } from "@/services/routines"
import { getUserRole } from "@/services/user"
import { getAllWorkouts } from "@/services/workouts"

import { styles } from "@/styles/anonymHome"

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
                router.replace("/(auth)/Login")
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
                <Pressable onPress={handleExit}>
                    <Image
                        source={require("@/assets/icons/logout.png")}
                        style={{ width: 22, height: 22, tintColor: "#fff" }}
                    />
                </Pressable>

            </View>

            <View style={styles.subheader}>
                <Pressable onPress={handleExit}>
                    <Text style={styles.link}>Already have an account? Log In</Text>
                </Pressable>
                <Text style={styles.guestTitle}>You logged as a guest!</Text>
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
                        <Text style={styles.cardMiniTitle} numberOfLines={1} ellipsizeMode="tail">
                            {workout.name}</Text>
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
                        <Text style={styles.cardMiniTitle} numberOfLines={1} ellipsizeMode="tail">
                            {routine.name}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>

        </ScrollView>
    )
}