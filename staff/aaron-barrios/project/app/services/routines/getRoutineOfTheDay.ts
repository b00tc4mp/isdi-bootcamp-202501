import AsyncStorage from "@react-native-async-storage/async-storage"

import { errors } from "com"
import { RoutineType } from "com/types"
import { data } from "@/data"

const { SystemError, AuthorizationError, NotFoundError } = errors

const CACHE_KEY = "routineOfTheDay"
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000 // 24h
// const CACHE_EXPIRATION = 2 * 60 * 1000 // 2 min

const getRoutineOfTheDay = async (): Promise<RoutineType> => {
    const token = await data.getToken()
    if (!token) throw new AuthorizationError("No token found")

    // 1. we check if we have a cachedRoutine
    const cachedRoutine = await AsyncStorage.getItem(CACHE_KEY)

    if (cachedRoutine) {
        const { routine, timestamp } = JSON.parse(cachedRoutine)

        // 2. check if it hasnt expired 
        if (Date.now() - timestamp < CACHE_EXPIRATION) {
            // 3. we check if routine is still existing (I can delete it w compile-tests)
            const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/routines/${routine.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (res.ok) return routine

            await AsyncStorage.removeItem(CACHE_KEY)
        }
    }

    // if the routine doesnt exist we go fetch and get a new one
    const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/routines/of-the-day`, {
        headers: { Authorization: `Bearer ${token}` }
    })

    if (!res.ok) throw new SystemError(`Error ${res.status}: ${res.statusText}`)

    const body = await res.json()

    if ("error" in body) {
        const Constructor = (errors as any)[body.error] || AuthorizationError
        throw new Constructor(body.message)
    }

    const routine = body as RoutineType

    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify({
        routine,
        timestamp: Date.now()
    }))

    return routine
}

export default getRoutineOfTheDay