import {json} from 'express'

//se crea una función para guardar la llamada de este middleware
export const jsonBodyParser = json()