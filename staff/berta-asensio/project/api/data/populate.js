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
                        name: 'Jamón dulce',
                        description: 'Bocadillo de jamón dulce',
                        allergens: [],
                        categories: ['regular'],
                        breadOptions: ['gluten', 'sin gluten', 'integral'],
                        price: 2.50
                    },
                    {
                        ordinal: 2,
                        name: 'Queso',
                        description: 'Bocadillo de queso',
                        allergens: ['lactosa'],
                        categories: ['regular', 'vegetariano', 'halal'],
                        breadOptions: ['gluten', 'sin gluten', 'integral'],
                        price: 2.5
                    },
                    {
                        ordinal: 3,
                        name: 'Jamón serrano',
                        description: 'Bocadillo de jamón serrano',
                        allergens: [],
                        categories: ['regular'],
                        breadOptions: ['gluten', 'sin gluten', 'integral'],
                        price: 2.5
                    },
                    {
                        ordinal: 4,
                        name: 'Atún y aceitunas',
                        description: 'Bocadillo de atún con aceitunas',
                        allergens: ['pescado'],
                        categories: ['regular', 'halal'],
                        breadOptions: ['gluten', 'sin gluten', 'integral'],
                        price: 2.5
                    },
                    {
                        ordinal: 5,
                        name: 'Tortilla francesa',
                        description: 'Bocadillo de tortilla a la francesa',
                        allergens: ['huevo'],
                        categories: ['regular', 'vegetariano', 'halal'],
                        breadOptions: ['gluten', 'sin gluten', 'integral'],
                        price: 2.5
                    },
                    {
                        ordinal: 6,
                        name: 'Vegetal',
                        description: 'Bocadillo de lechuga, tomate y huevo duro',
                        allergens: ['huevo'],
                        categories: ['regular', 'vegetariano', 'halal'],
                        breadOptions: ['gluten', 'sin gluten', 'integral'],
                        price: 2.5
                    },
                    {
                        ordinal: 7,
                        name: 'Vegetal con frutos secos',
                        description: 'Bocadillo de verdura con queso y nueces',
                        allergens: ['lactosa', 'frutos de cáscara'],
                        categories: ['regular', 'vegetariano', 'halal'],
                        breadOptions: ['gluten', 'sin gluten', 'integral'],
                        price: 2.5
                    },
                    {
                        ordinal: 8,
                        name: 'Vegetal con aguacate',
                        description: 'Bocadillo de aguacate, tomate y limón',
                        allergens: [],
                        categories: ['regular', 'vegetariano', 'halal'],
                        breadOptions: ['gluten', 'sin gluten', 'integral'],
                        price: 2.5
                    }

                ])
            })
    })

    .finally(() => data.disconnect())

    // node data/populate.js