import { data } from '../data/index.js'


// Funcion para Cerrar sesion
export const logoutUser = () => {
    data.userId = null
}