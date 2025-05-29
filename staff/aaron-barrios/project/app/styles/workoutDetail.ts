import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f5f5f5",
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingBottom: 80,
        paddingTop: 0
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
        fontSize: 24,
        fontWeight: "600",
        color: "#fff",
    },
    backText: {
        fontSize: 22,
        color: "#fff",
        fontWeight: "600",
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#000",
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        marginBottom: 16,
        backgroundColor: "#eee",
    },
    stats: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    rightStats: {
        flexDirection: "row",
        gap: 12,
    },
    icon: {
        fontSize: 18,
        color: "#000",
    },
    author: {
        color: "#0ea5e9",
        fontWeight: "600",
        fontSize: 12,
    },
    defaultAuthor: {
        color: "#888",
        fontStyle: "italic",
        fontSize: 12,
    },
    subtitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 24,
        marginBottom: 8,
        color: "#000",
    },
    data: {
        fontSize: 16,
        color: "#333",
        marginBottom: 4,
    },
    description: {
        fontSize: 16,
        lineHeight: 22,
        color: "#000",
    },
    reviewActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 32,
        gap: 12,
    },
    reviewButton: {
        flex: 1,
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
    },
    acceptBtn: {
        backgroundColor: "#3b944d",
        marginBottom: 10
    },
    declineBtn: {
        backgroundColor: "#a12828",
        marginBottom: 10
    },
    reviewText: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#fff",
    },
})