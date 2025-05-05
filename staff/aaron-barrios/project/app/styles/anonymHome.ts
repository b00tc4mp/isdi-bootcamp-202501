import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: "#fdfdfd",
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
        fontSize: 26,
        fontWeight: "bold",
        color: "white",
    },
    guestTitle: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#222",
        alignSelf: "flex-start",
        marginTop: 12,
    },
    subheader: {
        marginTop: 2,
        marginBottom: 20,
        alignItems: "center",
    },
    link: {
        color: "#0ea5e9",
        textDecorationLine: "underline",
        fontWeight: "600",
        fontSize: 16,
        marginBottom: 4,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        marginTop: 16,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 12,
    },
    horizontalList: {
        flexDirection: "row",
        marginBottom: 24,
    },
    cardMini: {
        width: 140,
        marginRight: 12,
        backgroundColor: "#d6d6d6",
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
    }
})