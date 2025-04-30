import AsyncStorage from "@react-native-async-storage/async-storage"

import { errors } from "com"
import { RoutineType } from "com/types"
import { data } from "@/data"

const { SystemError, AuthorizationError } = errors

const CACHE_KEY = "routineOfTheDay"
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000 // 24h en ms

const getRoutineOfTheDay = async (): Promise<RoutineType> => {
    // 1. Ver si hay una rutina cacheada válida
    const cached = await AsyncStorage.getItem(CACHE_KEY)

    if (cached) {
        const { routine, timestamp } = JSON.parse(cached)

        if (Date.now() - timestamp < CACHE_EXPIRATION) {
            return routine
        }
    }

    // 2. Si no hay cache válida → fetch al servidor
    const token = await data.getToken()
    if (!token) throw new AuthorizationError("No token found")

    const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/routines/of-the-day`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) throw new SystemError(`Error ${res.status}: ${res.statusText}`)

    const body = await res.json()

    if ("error" in body) {
        const Constructor = (errors as any)[body.error] || AuthorizationError
        throw new Constructor(body.message)
    }

    const routine = body as RoutineType

    // 3. Guardar la rutina como "del día" con timestamp
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify({
        routine,
        timestamp: Date.now()
    }))

    return routine
}

export default getRoutineOfTheDay