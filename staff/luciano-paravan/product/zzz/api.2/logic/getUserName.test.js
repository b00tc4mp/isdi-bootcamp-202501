import { getUserName } from './getUserName.js'

try {
    const user = getUserName('m7ypqlzdwy')

    console.log(user)
} catch (error) {
    console.error(error)
}