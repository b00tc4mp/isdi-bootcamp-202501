import AsyncStorage from "@react-native-async-storage/async-storage"

import { errors } from "com"
import { RoutineType } from "com/types"
import { data } from "@/data"

const { SystemError, AuthorizationError } = errors

const CACHE_KEY = "routineOfTheDay"
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000 // 24h in seconds

const getRoutineOfTheDay = async (): Promise<RoutineType> => {
    //1st we check if we already catched a daily routine
    const catchedRoutine = await AsyncStorage.getItem(CACHE_KEY)

    if (catchedRoutine) {
        const { routine, timestamp } = JSON.parse(catchedRoutine)

        if (Date.now() - timestamp < CACHE_EXPIRATION) {
            return routine
        }
    }

    //if its the 1st time you get in here or cache expired you go fetch
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

    //store the daily routine as the cache key in case you re enter here
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify({
        routine,
        timestamp: Date.now()
    }))

    return routine
}

export default getRoutineOfTheDay