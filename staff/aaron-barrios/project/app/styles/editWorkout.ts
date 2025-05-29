import { StyleSheet } from "react-native"

export
    const styles = StyleSheet.create({
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
            fontSize: 20,
            fontWeight: "bold",
            flexShrink: 1,
            textAlign: "right",
            marginLeft: 8,
            color: "white"
        },
        previewImage: {
            width: "100%",
            height: 180,
            borderRadius: 10,
            marginBottom: 16,
        },
        label: {
            fontWeight: "bold",
            marginBottom: 4,
            marginTop: 12,
        },
        input: {
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 8,
        },
        textarea: {
            minHeight: 80,
            textAlignVertical: "top",
        },
        saveButtonContainer: {
            marginTop: 24,
            marginBottom: 20,
            backgroundColor: "#222",
            paddingVertical: 14,
            borderRadius: 8,
            alignItems: "center",
        },
        saveButtonText: {
            color: "#fff",
            fontWeight: "bold",
            fontSize: 16,
        },
        loading: {
            padding: 20,
            fontSize: 16,
            textAlign: "center",
        },
        error: {
            padding: 20,
            fontSize: 16,
            color: "red",
            textAlign: "center",
        },
    })