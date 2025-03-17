import { getUserName } from './getUserName.js'

try {
    const user = getUserName('m7uf0vvi8r')

    console.log(user)
} catch (error) {
    console.error(error)
}