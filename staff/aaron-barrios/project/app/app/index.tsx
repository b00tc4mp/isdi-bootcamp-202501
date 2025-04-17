import { Redirect } from "expo-router"
import getAuthenticationData from "@/utils/getAuthenticationData"

import { useState, useEffect } from "react"

export default function IndexRedirect() {
    // ⚠️ Aquí no puedes usar useEffect porque esto es render puro
    const [screen, setScreen] = useState<"/(auth)" | "/(anonym)" | "/(mod)" | "/(tabs)" | null>(null)

    useEffect(() => {
        getAuthenticationData().then(data => {
            const role = data?.role

            if (!role) return setScreen("/(auth)")
            if (role === "anonym") return setScreen("/(anonym)")
            if (role === "moderator") return setScreen("/(mod)")
            return setScreen("/(tabs)")
        })
    }, [])

    if (!screen) return null

    return <Redirect href={screen} />
}