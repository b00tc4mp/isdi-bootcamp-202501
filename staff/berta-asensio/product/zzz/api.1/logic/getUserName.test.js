import { getUserName } from './getUserName.js'

//Le pasamos un userId y si lo encuentra nos devolverá el nombre
try {
    const user = getUserName('m76fm39hq1u')
    
    console.log(user)
} catch (error) {
    console.error(error)
}