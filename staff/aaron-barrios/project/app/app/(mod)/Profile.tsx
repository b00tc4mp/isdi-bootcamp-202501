import { useEffect, useState } from "react"
import {
    TextInput,
    Button,
    Alert,
    Platform,
    ScrollView,
    Pressable,
} from "react-native"
import { View, Text } from "@/components/Themed"
import { router } from "expo-router"

import type { UserType } from "com/types"
import { getUserData, updateUserData } from "@/services/user/regular"
import { getUserRole } from "@/services/user"

import { styles } from "@/styles/modProfile"

export default function Mod_Profile() {
    const [alias, setAlias] = useState("")
    const [email, setEmail] = useState("")
    const [currentUser, setCurrentUser] = useState<Omit<UserType, 'id' | 'createdAt'> | null>(null)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getUserRole().then(data => {
            if (data?.role !== "mod") {
                router.replace("/(auth)")
            } else {
                fetchUserData()
            }
        })
    }, [])

    const fetchUserData = () => {
        setLoading(true)
        getUserData()
            .then(user => {
                setAlias(user.alias || "")
                setEmail(user.email || "")
                setCurrentUser({
                    alias: user.alias || "",
                    email: user.email || "",
                })
            })
            .catch(error => {
                console.error("Error loading user data:", error)
                showAlert("Error", error.message || "Failed to fetch user data.")
            })
            .finally(() => setLoading(false))
    }

    const showAlert = (title: string, message: string) => {
        if (Platform.OS === "web") {
            window.alert(`${title}: ${message}`)
        } else {
            Alert.alert(title, message)
        }
    }

    const handleUpdate = () => {
        if (!currentUser) {
            showAlert("Error", "User data not loaded yet.")
            return
        }

        const updates = { alias, email }

        updateUserData(updates, currentUser)
            .then(() => showAlert("Success", "User data updated successfully!"))
            .catch(error => showAlert("Error", error.message || "Update failed."))
    }

    if (loading) return null

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{alias}'s  data</Text>

            <Text style={styles.label}>Alias</Text>
            <TextInput
                style={styles.input}
                value={alias}
                onChangeText={setAlias}
                placeholder="Enter your alias"
                autoCapitalize="none"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Pressable style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Update Profile</Text>
            </Pressable>


            <Pressable style={styles.linkButton} onPress={() => router.push("/(stack)/ChangePassword")}>
                <Text style={styles.linkText}>Change Password</Text>
            </Pressable>
        </ScrollView>
    )
}