import { StyleSheet } from "react-native"


export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingHorizontal: 24,
    },
    header: {
        backgroundColor: "#222",
        paddingVertical: 32,
        paddingHorizontal: 24,
        marginBottom: 24,
        marginHorizontal: -24,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "600",
        color: "#fff",
        marginBottom: 4,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#fff",
    },
    form: {
        flex: 1,
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
        color: "#000",
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        backgroundColor: "#fff",
        color: "#000",
    },
    button: {
        backgroundColor: "#222",
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 16,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    link: {
        fontSize: 14,
        color: "#000",
        textDecorationLine: "underline",
        marginTop: 16,
        textAlign: "center",
    },
    secondaryText: {
        fontSize: 14,
        color: "#000",
        textAlign: "center",
    },
    bold: {
        fontWeight: "bold",
    },
})