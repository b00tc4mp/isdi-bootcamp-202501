import { StyleSheet, Dimensions } from "react-native"

const { width, height } = Dimensions.get("window")


export const styles = StyleSheet.create({
    background: {
        width: width,
        height: height,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 60,
        paddingHorizontal: 24,
    },
    header: {
        alignItems: "center",
        marginTop: 40,
    },
    logo: {
        fontSize: 90,
        fontFamily: "Anton_400Regular",
        fontWeight: "900",
        color: "white",
        textShadowColor: "#000",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 6,
    },

    subtitle: {
        fontFamily: "Raleway_300Light",
        letterSpacing: 3,
        fontSize: 24,
        color: "#eee",
        marginTop: 2,
        textShadowColor: "#000",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
    footer: {
        alignItems: "center",
        width: "100%",
    },
    button: {
        width: "100%",
        backgroundColor: "#f5f5f5",
        paddingVertical: 14,
        borderRadius: 10,
        marginBottom: 12,
        alignItems: "center",
        borderWidth: 2,               // Reborde sutil
        borderColor: "#ccc",          // Color gris claro
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,                 // Profundidad en Android
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    guestText: {
        fontSize: 18,
        color: "#fff",
        marginTop: 12,
        textShadowColor: "#000",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        textDecorationLine: "underline"
    },
})