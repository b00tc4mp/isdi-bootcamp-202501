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
        paddingVertical: 4,
        backgroundColor: "rgba(184, 184, 184, 0.55)", // gris neutro más oscuro
        borderRadius: 10,
        padding: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
        color: "#111",
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
    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 12,
        backgroundColor: "rgba(204, 203, 203, 0.55)",
    },
    status: {
        fontSize: 12,
        fontStyle: "italic",
        color: "#111",
    },
    actions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        backgroundColor: "rgba(204, 203, 203, 0.55)",
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
})