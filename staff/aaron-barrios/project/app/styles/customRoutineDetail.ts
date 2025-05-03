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
        fontWeight: "bold",
        color: "#fff",
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    backButton: {
        marginBottom: 12,
    },
    backIcon: {
        fontSize: 26,
        color: "#555"
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        marginBottom: 16
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 8
    },
    summaryCard: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 12,
        marginBottom: 16,
        elevation: 2,
        gap: 8
    },
    summaryLeft: {
        flex: 1,
        gap: 4
    },
    summaryText: {
        fontSize: 14,
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
        marginBottom: 6
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
    actionButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginBottom: 12,
        gap: 12
    },
    actionButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: "center"
    },
    editButton: {
        backgroundColor: "#3b82f6"
    },
    deleteButton: {
        backgroundColor: "#ef4444"
    },
    actionText: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#fff"
    }
})