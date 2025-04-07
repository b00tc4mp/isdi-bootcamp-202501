import 'dotenv/config' // Carga variables de entorno desde un archivo .env
import { data, Post, User } from '../data/index.js'
import { getPosts } from './getPosts.js'
import { expect } from 'chai'
import { CredentialsError, NotFoundError } from 'com/errors.js'
import { Types } from 'mongoose'

const { MONGO_URL, MONGO_DB} = process.env // Credenciales de la base de datos obtenidas de las variables de entorno.
const { ObjectId } = Types // Permite generar un ID válido de MongoDB

describe('getPosts', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB)) // Conectar a la base de datos antes de correr los tests

    beforeEach(() => Post.deleteMany({})) // Vaciar la base de datos antes de cada test

    it('succeeds on existing post')
})