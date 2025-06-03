import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 16,
    },
    header: {
        marginBottom: 20,
    },
    logo: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
    },
    buttonPrimary: {
        backgroundColor: "#555",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 20,
    },
    buttonPrimaryText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
    card: {
        backgroundColor: "#e5e5e5",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardTextWrapper: {
        flex: 1,
        marginRight: 12,
    },
    cardTitle: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 4,
        color: "#000",
    },
    cardSubtext: {
        color: "#333",
        fontSize: 14,
    },
    cardArrow: {
        width: 36,
        height: 36,
        tintColor: "#000",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 24,
        marginBottom: 12,
        color: "#000",
    },
    horizontalList: {
        flexDirection: "row",
        marginBottom: 20,
    },
    cardMini: {
        width: 140,
        marginRight: 12,
        backgroundColor: "#ccc",
        borderRadius: 12,
        overflow: "hidden",
    },
    cardMiniImage: {
        width: "100%",
        height: 80,
    },
    cardMiniTitle: {
        fontWeight: "600",
        fontSize: 14,
        paddingHorizontal: 8,
        paddingVertical: 6,
        color: "#000",
        maxWidth: "100%",
    },
})