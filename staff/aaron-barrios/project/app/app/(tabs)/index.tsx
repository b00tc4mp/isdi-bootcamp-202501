import { useEffect, useState } from "react"
import { StyleSheet, ScrollView, Pressable } from "react-native"
import { Text, View } from "@/components/Themed"
import { router } from "expo-router"

import { getUserAlias } from "@/services/user/regular"
import { errors } from "com"
import { data } from "@/data"

const { NotFoundError } = errors

export default function Home() {
    const [alias, setAlias] = useState("User")

    useEffect(() => {
        getUserAlias()
            .then(({ alias }) => setAlias(alias))
            .catch(error => {
                console.error("Failed to fetch user alias:", error)

                if (error instanceof NotFoundError) {
                    data.removeToken()
                    router.replace("/(auth)/Login")
                }
            })
    }, [])


    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.logo}>Welcome back, {alias}</Text>
            </View>


            {/* Preference test */}
            <Pressable style={styles.buttonPrimary}>
                <Text style={styles.buttonPrimaryText}>Complete preference test</Text>
            </Pressable>

            {/* Quick access cards */}
            <Pressable style={styles.card}>
                <Text style={styles.cardTitle}>Complete profile data</Text>
                <Text style={styles.cardSubtext}>Preview</Text>
            </Pressable>
            <Pressable style={styles.card}>
                <Text style={styles.cardTitle}>Current routine</Text>
                <Text style={styles.cardSubtext}>Preview</Text>
            </Pressable>
            <Pressable style={styles.card}>
                <Text style={styles.cardTitle}>Last workout done</Text>
                <Text style={styles.cardSubtext}>Preview</Text>
            </Pressable>

            {/* Smart suggestions */}
            <Text style={styles.sectionTitle}>Smart suggestions</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestions}>
                <View style={styles.suggestionCard}><Text>Lorem Ipsum</Text></View>
                <View style={styles.suggestionCard}><Text>Lorem Ipsum</Text></View>
                <View style={styles.suggestionCard}><Text>Lorem Ipsum</Text></View>
            </ScrollView>

            {/* Tips and reminders */}
            <Text style={styles.sectionTitle}>Tips & Reminders</Text>
            <View style={styles.tips}>
                <Text style={styles.tip}>• Lorem ipsum</Text>
                <Text style={styles.tip}>• Lorem ipsum</Text>
                <Text style={styles.tip}>• Lorem ipsum</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        marginBottom: 20,
    },
    logo: {
        fontSize: 24,
        fontWeight: "bold",
    },
    welcome: {
        fontSize: 22,
        fontWeight: "600",
        marginTop: 8,
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
        backgroundColor: "#ddd",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    cardTitle: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 4,
    },
    cardSubtext: {
        color: "#666",
        fontSize: 14,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 24,
        marginBottom: 12,
    },
    suggestions: {
        flexDirection: "row",
        gap: 12,
    },
    suggestionCard: {
        width: 100,
        height: 100,
        backgroundColor: "#ccc",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    tips: {
        marginTop: 8,
    },
    tip: {
        fontSize: 14,
        marginBottom: 6,
    },
    logout: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 6,
        backgroundColor: "#c00",
        borderRadius: 8,
    },
})