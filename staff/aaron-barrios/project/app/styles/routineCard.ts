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
        color: "#111",
        marginBottom: 4,
        flexShrink: 1,
        maxWidth: "75%",
    },
    nameRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8,
    },
    d_info: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 4,
        color: "rgba(59, 59, 59, 0.62)",
    },
    date: {
        fontSize: 10,
        color: "#111",
        fontWeight: "600",
    },
    leftColumn: {
        flexDirection: "column",
        justifyContent: "flex-end",
        gap: 4,
    },
    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginTop: 4,
    },
    actions: {
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 14,
    },
    status: {
        fontSize: 12,
        fontStyle: "italic",
        color: "#111",
    },
    authorLink: {
        color: "#0ea5e9",
        fontWeight: "600",
        fontSize: 12,
        marginTop: 2,
    },
    defaultAuthor: {
        color: "#888",
        opacity: 0.7,
        fontStyle: "italic",
        fontSize: 12,
        marginTop: 2,
    },
})