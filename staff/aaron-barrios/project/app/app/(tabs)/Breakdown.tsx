import { Button, StyleSheet } from "react-native"
import { useRouter } from "expo-router"

import { Text, View } from "@/components/Themed"

export default function Breakdown() {
    const router = useRouter()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Breakdown</Text>
            <View style={styles.container}>
                <Text style={styles.title}>Your Progress!</Text>
                <View style={styles.button}>
                    {/* <Button title="Create Workout" onPress={() => router.push("/(tabs)/Home" as any)} /> */}
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
