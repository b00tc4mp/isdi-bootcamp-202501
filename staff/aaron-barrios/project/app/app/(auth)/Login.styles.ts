import { StyleSheet } from "react-native"


export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "white", // fondo blanco general
        paddingHorizontal: 24,
        paddingTop: 60,
    },
    header: {
        backgroundColor: "#111", // header seminegro
        paddingVertical: 24,
        paddingHorizontal: 16,
        marginBottom: 24,
        borderRadius: 12,
        width: "100%",
    },
    headerText: {
        fontSize: 20,
        fontWeight: "600",
        color: "#fff",
        marginBottom: 4,
    },
    title: {
        fontSize: 28,
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
        backgroundColor: "#111", // botón negro
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
        marginBottom: 16,
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