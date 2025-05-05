import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingHorizontal: 24,
    },
    header: {
        backgroundColor: "#222",
        paddingVertical: 32,
        paddingHorizontal: 24,
        marginBottom: 24,
        marginHorizontal: -24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
    },
    subtitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#222",
        paddingBottom: 24
    },
    optionsContainer: {
        gap: 12,
        marginBottom: 24,
    },
    option: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: "#ddd",
        borderRadius: 10,
    },
    selectedOption: {
        backgroundColor: "#facc15",
    },
    optionText: {
        fontSize: 16,
        fontWeight: "600",
    },
    saveButton: {
        backgroundColor: "#222",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    saveText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
})