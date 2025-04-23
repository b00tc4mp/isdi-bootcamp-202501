import { Button, StyleSheet, Alert } from "react-native"
import { useRouter } from "expo-router"
import { useEffect } from "react"

import { Text, View } from "@/components/Themed"

import { deleteAnonymUser } from "@/services/user/anonym"
import { getUserRole } from "@/services/user"

export default function Anonym_Home() {
    const router = useRouter()

    useEffect(() => {
        getUserRole().then(data => {
            if (data?.role !== 'anonym') {
                router.replace('/(auth)')
            }
        })
    }, [])

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
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>

            <Button title="Exit" onPress={handleExit} />
            <View style={styles.container}>
                <Text style={styles.title}>You are a guest!</Text>
                <View style={styles.button}>
                    {/* <Button title="LOG IN" onPress={() => router.push("/(tabs)/Profile" as any)} /> */}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        backgroundColor: "#f0f0f0"
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginBottom: 12
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    button: {
        marginBottom: 16
    }
})
