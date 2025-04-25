import 'dotenv/config'
import { data, User, ClothingItem } from '../data/index.js'
import bcrypt from 'bcryptjs'

const { MONGO_URL, DB_NAME } = process.env

data.connect(MONGO_URL, DB_NAME)
    .then(() => {
        return Promise.all([
            User.deleteMany({}),
            ClothingItem.deleteMany({})
        ])
            .then(() => bcrypt.hash('123123123', 10))
            .then(hash => {
                return User.insertMany([
                    { name: 'diego', lastname: 'maradona', email: 'diego@gmail.com', username: 'eldiegote', password: hash },
                    { name: 'claudio', lastname: 'caniggia', email: 'claudio@gmail.com', username: 'elpajaro', password: hash },
                    { name: 'eugeni', lastname: 'castells', email: 'eugeni@gmail.com', username: 'eleugeni', password: hash },
                    { name: 'aaron', lastname: 'barrios', email: 'aaron@gmail.com', username: 'elninoemperador', password: hash },
                    { name: 'charles', lastname: 'luciano', email: 'luciano@gmail.com', username: 'elluciano', password: hash },
                ])
            })
            .then(([diego, pajaro, eugeni, aaron, luciano]) => {
                return ClothingItem.insertMany([
                    {
                        owner: diego.id,
                        itemName: 'black leather jacket',
                        category: 'top',
                        type: 'jacket',
                        color: 'black',
                        season: ['autumn', 'winter'],
                        occasion: ['casual', 'party'],
                        createdAt: new Date(2025, 1, 10)
                    },
                    {
                        owner: diego.id,
                        itemName: 'grey wool sweater',
                        category: 'top',
                        type: 'sweater',
                        color: 'grey',
                        season: ['autumn', 'winter'],
                        occasion: ['casual', 'formal'],
                        createdAt: new Date(2025, 0, 22)
                    },
                    {
                        owner: diego.id,
                        itemName: 'dark blue chinos',
                        category: 'bottom',
                        type: 'pants',
                        color: 'dark blue',
                        season: ['autumn', 'spring'],
                        occasion: ['formal', 'casual'],
                        createdAt: new Date(2025, 2, 5)
                    },
                    {
                        owner: diego.id,
                        itemName: 'white sneakers',
                        category: 'shoes',
                        type: 'sneakers',
                        color: 'white',
                        season: ['summer', 'spring', 'autumn'],
                        occasion: ['casual', 'sport'],
                        createdAt: new Date(2025, 2, 8)
                    },
                    {
                        owner: diego.id,
                        itemName: 'navy blue suit blazer',
                        category: 'top',
                        type: 'blazer',
                        color: 'navy blue',
                        season: ['autumn', 'spring'],
                        occasion: ['formal'],
                        createdAt: new Date(2025, 1, 15)
                    },
                    {
                        owner: diego.id,
                        itemName: 'white cotton t-shirt',
                        category: 'top',
                        type: 't-shirt',
                        color: 'white',
                        season: ['summer', 'spring'],
                        occasion: ['casual'],
                        createdAt: new Date(2025, 2, 10)
                    },
                    {
                        owner: diego.id,
                        itemName: 'white cotton shirt',
                        category: 'top',
                        type: 'shirt',
                        color: 'white',
                        season: ['summer', 'spring'],
                        occasion: ['casual'],
                        createdAt: new Date(2025, 2, 1)
                    },
                    {
                        owner: diego.id,
                        itemName: 'light blue and white striped shirt',
                        category: 'top',
                        type: 'shirt',
                        color: 'light blue and white',
                        season: ['summer', 'spring', 'autumn'],
                        occasion: ['casual'],
                        createdAt: new Date(2025, 2, 1)
                    },
                    {
                        owner: diego.id,
                        itemName: 'light blue jeans',
                        category: 'bottom',
                        type: 'jeans',
                        color: 'light blue',
                        season: ['summer', 'spring', 'autumn'],
                        occasion: ['casual'],
                        createdAt: new Date(2025, 2, 1)
                    },
                    {
                        owner: diego.id,
                        itemName: 'black wool coat',
                        category: 'top',
                        type: 'coat',
                        color: 'black',
                        season: ['winter', 'autumn'],
                        occasion: ['formal', 'casual'],
                        createdAt: new Date(2025, 2, 1)
                    },
                    {
                        owner: diego.id,
                        itemName: 'grey hoodie',
                        category: 'top',
                        type: 'hoodie',
                        color: 'grey',
                        season: ['winter', 'autumn'],
                        occasion: ['casual', 'sport'],
                        createdAt: new Date(2025, 2, 1)
                    },
                    {
                        owner: diego.id,
                        itemName: 'navy blue suit jacket',
                        category: 'top',
                        type: 'jacket',
                        color: 'navy blue',
                        season: ['spring', 'autumn'],
                        occasion: ['formal'],
                        createdAt: new Date(2025, 2, 1)
                    },
                    {
                        owner: diego.id,
                        itemName: 'beige chinos',
                        category: 'bottom',
                        type: 'chinos',
                        color: 'beige',
                        season: ['summer', 'spring'],
                        occasion: ['casual', 'formal'],
                        createdAt: new Date(2025, 2, 1)
                    },
                    {
                        owner: diego.id,
                        itemName: 'dark green cargo pants',
                        category: 'bottom',
                        type: 'cargo',
                        color: 'dark green',
                        season: ['autumn', 'winter'],
                        occasion: ['casual', 'sport'],
                        createdAt: new Date(2025, 2, 9)
                    },
                    {
                        owner: diego.id,
                        itemName: 'black running shorts',
                        category: 'bottom',
                        type: 'shorts',
                        color: 'black',
                        season: ['summer'],
                        occasion: ['sport'],
                        createdAt: new Date(2025, 2, 2)
                    },
                    {
                        owner: diego.id,
                        itemName: 'white sneakers',
                        category: 'footwear',
                        type: 'sneakers',
                        color: 'white',
                        season: ['summer', 'spring'],
                        occasion: ['casual', 'sport'],
                        createdAt: new Date(2025, 2, 3)
                    },
                    {
                        owner: diego.id,
                        itemName: 'brown leather shoes',
                        category: 'footwear',
                        type: 'shoes',
                        color: 'brown',
                        season: ['autumn', 'spring'],
                        occasion: ['formal'],
                        createdAt: new Date(2025, 2, 1)
                    },
                    {
                        owner: diego.id,
                        itemName: 'red t-shirt',
                        category: 'top',
                        type: 't-shirt',
                        color: 'red',
                        season: ['summer', 'spring'],
                        occasion: ['casual'],
                        createdAt: new Date(2025, 2, 1)
                    },
                    {
                        owner: diego.id,
                        itemName: 'black turtleneck sweater',
                        category: 'top',
                        type: 'sweater',
                        color: 'black',
                        season: ['winter', 'autumn'],
                        occasion: ['formal', 'casual'],
                        createdAt: new Date(2025, 2, 6)
                    },
                    {
                        owner: diego.id,
                        itemName: 'denim jacket',
                        category: 'top',
                        type: 'jacket',
                        color: 'blue',
                        season: ['spring', 'autumn'],
                        occasion: ['casual'],
                        createdAt: new Date(2025, 2, 5)
                    },
                    {
                        owner: diego.id,
                        itemName: 'grey sweatpants',
                        category: 'bottom',
                        type: 'sweatpants',
                        color: 'grey',
                        season: ['winter', 'autumn'],
                        occasion: ['sport', 'casual'],
                        createdAt: new Date(2025, 2, 7)
                    },
                    {
                        owner: diego.id,
                        itemName: 'black dress pants',
                        category: 'bottom',
                        type: 'trousers',
                        color: 'black',
                        season: ['winter', 'autumn', 'spring'],
                        occasion: ['formal'],
                        createdAt: new Date(2025, 1, 1)
                    },
                    {
                        owner: diego.id,
                        itemName: 'white polo shirt',
                        category: 'top',
                        type: 'polo',
                        color: 'white',
                        season: ['summer', 'spring'],
                        occasion: ['casual'],
                        createdAt: new Date(2025, 2, 8)
                    },
                    {
                        owner: diego.id,
                        itemName: 'blue swim shorts',
                        category: 'bottom',
                        type: 'shorts',
                        color: 'blue',
                        season: ['summer'],
                        occasion: ['sport', 'casual'],
                        createdAt: new Date(2025, 2, 9)
                    },
                    {
                        owner: diego.id,
                        itemName: 'black blazer',
                        category: 'top',
                        type: 'jacket',
                        color: 'black',
                        season: ['spring', 'autumn'],
                        occasion: ['formal'],
                        createdAt: new Date(2025, 2, 1)
                    },
                    {
                        owner: diego.id,
                        itemName: 'white dress shirt',
                        category: 'top',
                        type: 'shirt',
                        color: 'white',
                        season: ['autumn', 'spring'],
                        occasion: ['formal'],
                        createdAt: new Date(2025, 2, 1)
                    },
                    {
                        owner: pajaro.id,
                        itemName: 'green flannel shirt',
                        category: 'top',
                        type: 'shirt',
                        color: 'green',
                        season: ['autumn', 'winter'],
                        occasion: ['casual'],
                        createdAt: new Date(2025, 3, 5)
                    },
                    {
                        owner: pajaro.id,
                        itemName: 'orange hoodie',
                        category: 'top',
                        type: 'hoodie',
                        color: 'orange',
                        season: ['autumn', 'winter'],
                        occasion: ['casual', 'sport'],
                        createdAt: new Date(2025, 2, 8)
                    },
                    {
                        owner: pajaro.id,
                        itemName: 'dark blue jeans',
                        category: 'bottom',
                        type: 'jeans',
                        color: 'dark blue',
                        season: ['autumn', 'winter', 'spring'],
                        occasion: ['casual'],
                        createdAt: new Date(2025, 1, 1)
                    },
                    {
                        owner: pajaro.id,
                        itemName: 'grey coat',
                        category: 'top',
                        type: 'coat',
                        color: 'grey',
                        season: ['winter', 'autumn'],
                        occasion: ['formal', 'casual'],
                        createdAt: new Date(2025, 1, 1)
                    },
                    {
                        owner: pajaro.id,
                        itemName: 'blue checkered shirt',
                        category: 'top',
                        type: 'shirt',
                        color: 'blue',
                        season: ['spring', 'autumn'],
                        occasion: ['casual'],
                        createdAt: new Date(2025, 2, 1)
                    },
                    {
                        owner: pajaro.id,
                        itemName: 'black trousers',
                        category: 'bottom',
                        type: 'trousers',
                        color: 'black',
                        season: ['autumn', 'spring', 'winter'],
                        occasion: ['formal'],
                        createdAt: new Date(2025, 3, 1)
                    },
                    {
                        owner: pajaro.id,
                        itemName: 'white t-shirt',
                        category: 'top',
                        type: 't-shirt',
                        color: 'white',
                        season: ['summer', 'spring'],
                        occasion: ['casual'],
                        createdAt: new Date(2025, 2, 1)
                    },
                    {
                        owner: pajaro.id,
                        itemName: 'navy blue blazer',
                        category: 'top',
                        type: 'jacket',
                        color: 'navy blue',
                        season: ['autumn', 'spring'],
                        occasion: ['formal'],
                        createdAt: new Date(2025, 2, 1)
                    },
                    {
                        owner: pajaro.id,
                        itemName: 'white sneakers',
                        category: 'footwear',
                        type: 'sneakers',
                        color: 'white',
                        season: ['summer', 'spring'],
                        occasion: ['casual', 'sport'],
                        createdAt: new Date(2025, 2, 1)
                    },
                    {
                        owner: pajaro.id,
                        itemName: 'black leather shoes',
                        category: 'footwear',
                        type: 'shoes',
                        color: 'black',
                        season: ['autumn', 'spring'],
                        occasion: ['formal'],
                        createdAt: new Date(2025, 2, 1)
                    },
                    {
                        owner: pajaro.id,
                        itemName: 'grey joggers',
                        category: 'bottom',
                        type: 'sweatpants',
                        color: 'grey',
                        season: ['winter', 'autumn'],
                        occasion: ['sport'],
                        createdAt: new Date(2025, 2, 1)
                    },
                    {
                        owner: pajaro.id,
                        itemName: 'yellow polo shirt',
                        category: 'top',
                        type: 'polo',
                        color: 'yellow',
                        season: ['summer', 'spring'],
                        occasion: ['casual'],
                        createdAt: new Date(2025, 2, 1)
                    },
                    {
                        owner: pajaro.id,
                        itemName: 'red party shirt',
                        category: 'top',
                        type: 'shirt',
                        color: 'red',
                        season: ['summer'],
                        occasion: ['party'],
                        createdAt: new Date(2025, 2, 1)
                    },
                    {
                        owner: pajaro.id,
                        itemName: 'black party jeans',
                        category: 'bottom',
                        type: 'jeans',
                        color: 'black',
                        season: ['summer', 'autumn'],
                        occasion: ['party'],
                        createdAt: new Date(2025, 2, 1)
                    },
                    {
                        owner: pajaro.id,
                        itemName: 'green sweater',
                        category: 'top',
                        type: 'sweater',
                        color: 'green',
                        season: ['winter', 'autumn'],
                        occasion: ['casual'],
                        createdAt: new Date(2025, 2, 1)
                    },
                    {
                        owner: pajaro.id,
                        itemName: 'blue cargo pants',
                        category: 'bottom',
                        type: 'cargo',
                        color: 'blue',
                        season: ['autumn', 'winter'],
                        occasion: ['casual', 'sport'],
                        createdAt: new Date(2025, 2, 1)
                    },
                    {
                        owner: pajaro.id,
                        itemName: 'orange running shorts',
                        category: 'bottom',
                        type: 'shorts',
                        color: 'orange',
                        season: ['summer'],
                        occasion: ['sport'],
                        createdAt: new Date(2025, 2, 1)
                    },
                    {
                        owner: pajaro.id,
                        itemName: 'white dress shirt',
                        category: 'top',
                        type: 'shirt',
                        color: 'white',
                        season: ['spring', 'autumn'],
                        occasion: ['formal'],
                        createdAt: new Date(2025, 2, 1)
                    },
                    {
                        owner: pajaro.id,
                        itemName: 'navy blue trousers',
                        category: 'bottom',
                        type: 'trousers',
                        color: 'navy blue',
                        season: ['spring', 'autumn'],
                        occasion: ['formal'],
                        createdAt: new Date(2025, 2, 1)
                    },
                    {
                        owner: pajaro.id,
                        itemName: 'green hoodie',
                        category: 'top',
                        type: 'hoodie',
                        color: 'green',
                        season: ['autumn', 'winter'],
                        occasion: ['casual', 'sport'],
                        createdAt: new Date(2025, 1, 18)
                    },
                    {
                        owner: pajaro.id,
                        itemName: 'black cargo pants',
                        category: 'bottom',
                        type: 'pants',
                        color: 'black',
                        season: ['autumn', 'spring', 'winter'],
                        occasion: ['casual'],
                        createdAt: new Date(2025, 2, 1)
                    },
                    {
                        owner: pajaro.id,
                        itemName: 'red checkered flannel shirt',
                        category: 'top',
                        type: 'shirt',
                        color: 'red and black',
                        season: ['autumn', 'winter'],
                        occasion: ['casual'],
                        createdAt: new Date(2025, 1, 5)
                    },
                    {
                        owner: pajaro.id,
                        itemName: 'beige trench coat',
                        category: 'top',
                        type: 'coat',
                        color: 'beige',
                        season: ['autumn', 'winter'],
                        occasion: ['formal'],
                        createdAt: new Date(2025, 0, 29)
                    },
                    {
                        owner: pajaro.id,
                        itemName: 'black leather boots',
                        category: 'shoes',
                        type: 'boots',
                        color: 'black',
                        season: ['autumn', 'winter'],
                        occasion: ['formal', 'party'],
                        createdAt: new Date(2025, 1, 25)
                    },
                    {
                        owner: pajaro.id,
                        itemName: 'blue graphic t-shirt',
                        category: 'top',
                        type: 't-shirt',
                        color: 'blue',
                        season: ['summer', 'spring'],
                        occasion: ['casual'],
                        createdAt: new Date(2025, 2, 9)
                    }
                ])
            })
    })
    .finally(() => data.disconnect())