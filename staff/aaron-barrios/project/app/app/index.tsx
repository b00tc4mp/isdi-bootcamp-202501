// import { useEffect } from "react"
// import { useRouter } from "expo-router"
// import { Platform } from "react-native"

// export default function Index() {
//     const router = useRouter()

//     useEffect(() => {
//         // Solo realizar la navegación si el layout ya está montado
//         setTimeout(() => {
//             if (Platform.OS !== "web") {
//                 router.replace("/(auth)")
//             }
//         }, 0)
//     }, [])

//     return null // No renderiza nada mientras redirige
// }