import { getUserName } from './getUsername.js'

try {
    const user = getUserName('20y8wll1xsu')

    console.log(user)
} catch (error) {
    console.error(error)
}