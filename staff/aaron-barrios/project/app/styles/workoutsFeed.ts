import { Platform, StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 24,
        backgroundColor: "#fefefe",
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 12,
        color: "#000",
    },
    dropdownContainer: {
        backgroundColor: "#eee",
        borderRadius: 8,
        marginBottom: 12,
        overflow: "hidden",
    },
    picker: {
        height: Platform.OS === "ios" ? 180 : 50,
        width: "100%",
        paddingVertical: 28,
    },
    filters: {
        flexDirection: "row",
        gap: 6,
        marginBottom: 12,
    },
    chip: {
        width: "32%",
        height: 40,
        borderRadius: 8,
        backgroundColor: "#ccc",
        alignItems: "center",
        justifyContent: "center",
    },
    chipActive: {
        backgroundColor: "#facc15",
    },
    chipText: {
        fontWeight: "600",
        fontSize: 15,
        color: "#000",
        textAlign: "center",
        lineHeight: 18,
    },
    list: {
        paddingBottom: 20,
    },
    createButton: {
        width: "100%",
        backgroundColor: "#222",
        paddingVertical: 14,
        borderRadius: 10,
        marginBottom: 16,
        alignItems: "center",
    },
    createButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
})