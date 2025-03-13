import { getUserName } from './getUserName.js'

try {
    const user = getUserName('m7a771ui2b')

    console.log(user)
} catch (error) {
    console.error(error)
}