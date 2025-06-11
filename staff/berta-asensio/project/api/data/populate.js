import 'dotenv/config'
import { data, User, Menu, Order } from '../data/index.js'
import bcrypt from 'bcryptjs'

const { MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        return Promise.all([
            User.deleteMany({}),
            Menu.deleteMany({}),
            Order.deleteMany({})
        ])
            .then(() => bcrypt.hash('123123aa', 10))
            .then(hash => {
                return User.insertMany([
                    {
                        name: 'Abeja Amarilla',
                        email: 'abeja@amarilla.com',
                        password: hash,
                        credit: 0
                    },
                    {
                        name: 'Burro Blanco',
                        email: 'burro@blanco.com',
                        password: hash,
                        credit: 0
                    },
                    {
                        name: 'Caballo Caoba',
                        email: 'caballo@caoba.com',
                        password: hash,
                        credit: 0
                    },
                    {
                        name: 'Delfín Dorado',
                        email: 'delfin@dorado.com',
                        password: hash,
                        credit: 0
                    },
                    {
                        name: 'Elefante Esmeralda',
                        email: 'elefante@esmeralda.com',
                        password: hash,
                        credit: 0
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
                        categories: ['regular', 'vegetariano', 'vegano', 'halal'],
                        breadOptions: ['gluten', 'sin gluten', 'integral'],
                        price: 2.5
                    }

                ])
            })
            .then(() => Promise.all([
                User.find().lean(),
                Menu.find().lean()
            ]))
            .then(([users, menus]) => {
                return Order.insertMany([
                    {
                        user: users[0]._id,
                        menu: menus[0]._id,
                        bread: 'gluten'
                    },
                    {
                        user: users[1]._id,
                        menu: menus[1]._id,
                        bread: 'sin gluten'
                    },
                    {
                        user: users[2]._id,
                        menu: menus[2]._id,
                        bread: 'integral'
                    },
                    {
                        user: users[3]._id,
                        menu: menus[3]._id,
                        bread: 'gluten'
                    }
                ])
            })
    })

    .finally(() => data.disconnect())

// node data/populate.js