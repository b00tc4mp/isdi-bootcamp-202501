import 'dotenv/config'
import { data, User, Menu } from '../data/index.js'
import bcrypt from 'bcryptjs'

const { MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        return Promise.all([
            User.deleteMany({}),
            Menu.deleteMany({})
        ])
            .then(() => bcrypt.hash('123123aa', 10))
            .then(hash => {
                return User.insertMany([
                    {
                        name: 'Abeja Amarilla',
                        email: 'abeja@amarilla.com',
                        password: hash
                    },
                    {
                        name: 'Burro Blanco',
                        email: 'burro@blanco.com',
                        password: hash
                    },
                    {
                        name: 'Caballo Caoba',
                        email: 'caballo@caoba.com',
                        password: hash
                    },
                    {
                        name: 'Delfín Dorado',
                        email: 'delfin@dorado.com',
                        password: hash
                    },
                    {
                        name: 'Elefante Esmeralda',
                        email: 'elefante@esmeralda.com',
                        password: hash
                    }
                ])
            })
            .then(() => {
                return Menu.insertMany([
                    {
                        ordinal: 1,
                        name: 'Traditional',
                        description: 'Sandwitx',
                        allergens: ['gluten'],
                        categories: ['regular'],
                        price: 2.50
                    },
                    {
                        ordinal: 2,
                        name: 'Traditional +',
                        description: 'Sandwitx + fruit',
                        allergens: ['gluten'],
                        categories: ['regular'],
                        price: 3.50
                    },
                    {
                        ordinal: 3,
                        name: 'Traditional extra +',
                        description: 'Sandwitx + fruit + yogurt',
                        allergens: ['gluten', 'lactose'],
                        categories: ['regular'],
                        price: 4
                    }
                ])
            })
    })

    .finally(() => data.disconnect())

    // node data/populate.js