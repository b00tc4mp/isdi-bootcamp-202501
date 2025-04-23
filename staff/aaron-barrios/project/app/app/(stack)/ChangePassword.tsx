import { useState } from "react"
import {
    StyleSheet,
    TextInput,
    Button,
    Alert,
    Platform,
    ScrollView,
    Pressable,
} from "react-native"
import { View, Text } from "@/components/Themed"
import { router } from "expo-router"

import changePassword from "@/services/user/mod/changePassword"

export default function ChangePasswordScreen() {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const showAlert = (title: string, message: string) => {
        if (Platform.OS === "web") {
            window.alert(`${title}: ${message}`)
        } else {
            Alert.alert(title, message)
        }
    }

    const handleChangePassword = () => {
        if (newPassword !== confirmPassword) {
            showAlert("Error", "New passwords do not match")
            return
        }

        setLoading(true)
        changePassword(currentPassword, newPassword)
            .then(() => {
                showAlert("Success", "Password changed successfully!")
                router.back()
            })
            .catch(error => {
                console.error(error)
                showAlert("Error", error.message || "Failed to change password")
            })
            .finally(() => setLoading(false))
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <View style={styles.subheader}>
                <Text style={styles.title}>Change Password</Text>

                <Pressable onPress={() => router.back()}>
                    <Text style={styles.backButton}>← Back</Text>
                </Pressable>
            </View>

            <Text style={styles.label}>Current Password</Text>
            <TextInput
                style={styles.input}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Enter current password"
                secureTextEntry
            />

            <Text style={styles.label}>New Password</Text>
            <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                secureTextEntry
            />

            <Text style={styles.label}>Confirm New Password</Text>
            <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Repeat new password"
                secureTextEntry
            />

            <View style={styles.button}>
                <Button title="Update Password" onPress={handleChangePassword} disabled={loading} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: "#f0f0f0",
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 4,
        marginTop: 12,
    },
    subheader: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    input: {
        backgroundColor: "#fff",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 8,
    },
    button: {
        marginTop: 20,
    },
    backButton: {
        marginBottom: 12,
        fontSize: 16,
        color: "#0ea5e9",
        fontWeight: "bold"
    },
})