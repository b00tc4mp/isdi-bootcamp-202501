import { StyleSheet, Image } from "react-native"
import { Text, View } from "@/components/Themed"

export default function Breakdown() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your progress tracker!</Text>

            <View style={styles.content}>
                <Image
                    source={{ uri: "https://cdn-icons-png.flaticon.com/512/6840/6840478.png" }}
                    style={styles.image}
                />
                <Text style={styles.subtitle}>Coming Soon</Text>
                <Text style={styles.description}>
                    We're working hard to bring you detailed progress tracking including AI-powered insights about your body composition.
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fefefe",           // 🧼 Fondo blanco-grisáceo
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 80,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 24,
        color: "#000",                        // 🖤 Texto oscuro
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: "#e5e5e5"
    },
    image: {
        width: 140,
        height: 140,
        marginBottom: 24,
        opacity: 0.9,
    },
    subtitle: {
        fontSize: 22,
        fontWeight: "600",
        color: "#000",                        // 🖤 Texto oscuro
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        color: "#444",
        maxWidth: 320,
        lineHeight: 22,
    },
})
