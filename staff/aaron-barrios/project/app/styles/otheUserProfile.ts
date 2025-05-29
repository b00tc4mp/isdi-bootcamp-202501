import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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
    tabs: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
        gap: 8
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: "#ddd",
        alignItems: "center"
    },
    activeTab: {
        backgroundColor: "#facc15",
    },
    dataContainer: {
        gap: 16,
        marginTop: 4,
    },

    alignedContainer: {
        paddingHorizontal: 4,
    },

    field: {
        fontSize: 18,
        lineHeight: 28,
        color: "#111",
    },
    label: {
        fontWeight: "bold",
        color: "#000",
    },
    error: {
        marginTop: 40,
        textAlign: "center",
        fontSize: 16,
        color: "red"
    }
})