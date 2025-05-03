import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 24,
        paddingBottom: 80,
    },
    header: {
        backgroundColor: "#222",
        paddingVertical: 32,
        paddingHorizontal: 24,
        marginHorizontal: -24,
        marginBottom: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#fff",
        flexShrink: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
        color: "#000",
    },
    workoutCard: {
        backgroundColor: "#d6d6d6",
        padding: 16,
        marginBottom: 16,
        borderRadius: 12,
    },
    workoutTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#000",
    },
    workoutImage: {
        width: "100%",
        height: 160,
        borderRadius: 8,
        marginBottom: 12,
        backgroundColor: "#ccc",
    },
    inputGroup: {
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        color: "#000",
        marginBottom: 4,
        fontWeight: "500",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 15,
        color: "#000",
        backgroundColor: "#fff",
    },
    saveButton: {
        backgroundColor: "#22c55e",
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 24,
    },
    saveButtonText: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#fff",
    },
})