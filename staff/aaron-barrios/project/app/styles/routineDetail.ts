import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 24,
        paddingTop: 0,
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
        fontSize: 24,
        fontWeight: "600",
        color: "#fff",
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    backButton: {
        marginBottom: 16,
        paddingTop: 32,
    },
    backIcon: {
        fontSize: 26,
        color: "#000",
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 8,
    },
    summaryCard: {
        flexDirection: "row",
        backgroundColor: "#e5e5e5",
        padding: 12,
        borderRadius: 12,
        marginBottom: 16,
        gap: 8,
    },
    summaryLeft: {
        flex: 1,
        gap: 4,
    },
    summaryRight: {
        justifyContent: "center",
        alignItems: "flex-end",
        gap: 8,
    },
    summaryText: {
        fontSize: 14,
        color: "#000",
    },
    icon: {
        fontSize: 18,
        color: "#000",
    },
    subtitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 24,
        marginBottom: 12,
        color: "#000",
    },
    description: {
        fontSize: 16,
        color: "#000",
        marginBottom: 24,
        lineHeight: 22,
    },
    workoutItem: {
        backgroundColor: "#e5e5e5",
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
    },
    workoutName: {
        fontSize: 20,
        fontWeight: "600",
        color: "#000",
        marginBottom: 6,
    },
    workoutDataRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
    },
    workoutData: {
        fontSize: 14,
        color: "#333",
    },
    workoutImage: {
        width: "100%",
        height: 160,
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: "#ddd",
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
    customizeButton: {
        backgroundColor: "#facc15",
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 24,
        alignItems: "center",
    },
    customizeButtonText: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#000",
    },
})