import { useState } from "react"
import {
    TextInput,
    Alert,
    Platform,
    ScrollView,
    Pressable,
    Image,
} from "react-native"
import { View, Text } from "@/components/Themed"
import { router } from "expo-router"

import changePassword from "@/services/user/mod/changePassword"

import { styles } from "@/styles/changePassword"

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
        <ScrollView contentContainerStyle={styles.container} >

            <View style={styles.header}>
                <Text style={styles.title}>Change Password</Text>
                <Pressable onPress={() => router.back()}>
                    <Image
                        source={require("@/assets/icons/back.png")}
                        style={{ width: 22, height: 22, tintColor: "#fff" }}
                    />
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

            <Pressable style={styles.button} onPress={handleChangePassword} disabled={loading}>
                <Text style={styles.buttonText}>Update Password</Text>
            </Pressable>
        </ScrollView>
    )
}