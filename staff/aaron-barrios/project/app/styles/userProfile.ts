import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    screen: {
        flexGrow: 1,
        backgroundColor: "#f5f5f5",
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    container: {
        padding: 24,
        backgroundColor: "#f0f0f0",
        flexGrow: 1
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 24,
        color: "#111",
    },
    tabs: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
        marginBottom: 16,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: "#ddd",
        alignItems: "center",
    },
    activeTab: {
        backgroundColor: "#facc15",
    },
    tabText: {
        fontWeight: "600",
        color: "#111",
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
        color: "#000",
    },
    input: {
        height: 44,
        backgroundColor: "#fff",
        paddingHorizontal: 12,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    levelPicker: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
        marginBottom: 16,
    },
    levelOption: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: "#ddd",
        alignItems: "center",
    },
    activeLevel: {
        backgroundColor: "#facc15",
    },
    interestsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 16,
    },
    interestOption: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: "#ddd",
    },
    activeInterest: {
        backgroundColor: "#4ade80",
    },
    dropdownContainer: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 16,
    },
    dropdownButton: {
        paddingVertical: 10,
        paddingHorizontal: 58,
        borderRadius: 8,
        backgroundColor: "#ddd",
    },
    activeDropdown: {
        backgroundColor: "#facc15",
    },
    button: {
        backgroundColor: "#222",
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 16,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    linkButton: {
        marginTop: 24,
        alignItems: "center",
    },
    linkText: {
        fontSize: 14,
        color: "#0ea5e9",
        textDecorationLine: "underline",
    },
    placeholder: {
        textAlign: "center",
        marginTop: 32,
        fontStyle: "italic",
        color: "#888",
    },
})