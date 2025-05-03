import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#e5e5e5",
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    image: {
        width: 100,
        height: 120,
        borderRadius: 10,
        marginRight: 12,
        backgroundColor: "#e5e5e5",
    },
    info: {
        flex: 1,
        justifyContent: "center",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 6,
    },
    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 12,
    },
    status: {
        fontSize: 12,
        fontStyle: "italic",
        color: "#666",
    },
    actions: {
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
    },
    deleteIcon: {
        width: 20,
        height: 20,
        tintColor: "red",
    },
    authorLink: {
        color: "#0ea5e9",
        fontWeight: "600",
        fontSize: 12,
        marginTop: 4,
    },
    defaultAuthor: {
        color: "#888",
        opacity: 0.7,
        fontStyle: "italic",
        fontSize: 12,
        marginTop: 4,
    },
    date: {
        fontWeight: "600",
        fontSize: 10,
        marginTop: 4,
    },
    reviewActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
        gap: 8,
    },
    reviewButton: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: "center",
    },
    acceptBtn: {
        backgroundColor: "#22c55e",
    },
    declineBtn: {
        backgroundColor: "#ef4444",
    },
    reviewText: {
        color: "#fff",
        fontWeight: "bold",
    },
})