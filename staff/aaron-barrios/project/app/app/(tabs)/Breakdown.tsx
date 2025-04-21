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
        padding: 16,
        backgroundColor: "#f0f0f0",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    image: {
        width: 120,
        height: 120,
        marginBottom: 24,
        opacity: 0.8,
    },
    subtitle: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        color: "#666",
        maxWidth: 320,
        lineHeight: 22,
    },
})