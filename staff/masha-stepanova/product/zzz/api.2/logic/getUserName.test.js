import { getUserName } from './getUserName.js'

try {
    const user = getUserName('m7yz5vpd0gg')

    console.log(user)
} catch (error) {
    console.error(error)
}