import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#f5f5f5",
        padding: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 24,
        color: "#000",
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
        color: "#000",
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        backgroundColor: "#fff",
        color: "#000",
    },
    button: {
        backgroundColor: "#222",
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 24,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    linkButton: {
        marginTop: 24,
        alignItems: "center",
    },
    linkText: {
        color: "#0ea5e9",
        fontWeight: "600",
        fontSize: 16,
    },
})