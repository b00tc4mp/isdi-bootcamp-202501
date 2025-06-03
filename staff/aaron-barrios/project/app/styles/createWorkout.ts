import { StyleSheet, Platform } from "react-native"

export

    const styles = StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: "#f5f5f5",
            paddingHorizontal: 24,
        },
        header: {
            backgroundColor: "#222",
            paddingVertical: 24,
            paddingHorizontal: 24,
            marginBottom: 24,
            marginHorizontal: -24,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        title: {
            fontSize: 26,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
        },
        label: {
            fontSize: 14,
            color: "#000",
            marginBottom: 6,
            marginTop: 4,
            fontWeight: "500",
        },
        input: {
            backgroundColor: "#fff",
            paddingHorizontal: 12,
            paddingVertical: 10,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#ccc",
            marginBottom: 16,
            fontSize: 15,
            color: "#000",
        },
        textarea: {
            height: 100,
            textAlignVertical: "top",
        },
        pickerContainer: {
            backgroundColor: "#fff",
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#ccc",
            marginBottom: 16,
            overflow: "hidden",
        },
        picker: {
            height: Platform.OS === "ios" ? 180 : 55,
            width: "100%",
            color: "#000",
        },
        submit: {
            backgroundColor: "#222",
            paddingVertical: 14,
            borderRadius: 8,
            alignItems: "center",
            marginTop: 12,
            marginBottom: 12,
        },
        submitText: {
            color: "#fff",
            fontWeight: "bold",
            fontSize: 16,
        },
    })