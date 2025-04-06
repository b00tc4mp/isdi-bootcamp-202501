import { getCurrentUser } from './getCurrentUser.js'

try {
    const name = getCurrentUser()

    console.log(name)
} catch (error) {
    console.error(error)
}