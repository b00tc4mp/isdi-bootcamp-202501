import Constants from "expo-constants"
import { errors } from 'com'

const { SystemError } = errors

const getEnv = () => {
    const extra = Constants.expoConfig?.extra || Constants.manifest?.extra

    const apiUrl = extra?.apiUrl

    if (!apiUrl) throw new SystemError("apiUrl is missing in app.config.ts")

    return { apiUrl }
}

export default getEnv