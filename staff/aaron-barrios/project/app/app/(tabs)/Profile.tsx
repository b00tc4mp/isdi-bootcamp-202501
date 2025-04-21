import { Button, StyleSheet } from "react-native"
import { useRouter } from "expo-router"

import { Text, View } from "@/components/Themed"

export default function Profile() {
    const router = useRouter()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Users Profile</Text>
            <View style={styles.container}>
                <Text style={styles.title}>Your Data!</Text>
                <View style={styles.button}>
                    <Button title="User data" onPress={() => router.push("/(tabs)/Home" as any)} />
                    <Button title="Change data" onPress={() => router.push("/(tabs)/Home" as any)} />
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
        fontSize: 24,
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
