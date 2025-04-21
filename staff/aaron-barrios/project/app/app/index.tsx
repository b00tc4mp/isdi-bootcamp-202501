// import { Redirect } from "expo-router"
// import { useState, useEffect } from "react"

// import { getUserRole } from "@/services/session"

// export default function IndexRedirect() {
//     const [screen, setScreen] = useState<"/(auth)" | "/(anonym)" | "/(mod)" | "/(tabs)" | null>(null)

//     useEffect(() => {
//         getUserRole().then(data => {
//             const role = data?.role

//             if (!role) return setScreen("/(auth)")
//             if (role === "anonym") return setScreen("/(anonym)")
//             if (role === "mod") return setScreen("/(mod)")
//             return setScreen("/(tabs)")
//         })
//     }, [])

//     if (!screen) return null

//     return <Redirect href={screen} />
// }