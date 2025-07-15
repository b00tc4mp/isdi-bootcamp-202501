import { data } from '../data/index.js'

export const logoutUser = () => {
        data.token = null
}

/*
Establecemos el token a null dentro de data. De esta manera eliminamos el token
por lo que se cierra la sesión del usuario.
*/