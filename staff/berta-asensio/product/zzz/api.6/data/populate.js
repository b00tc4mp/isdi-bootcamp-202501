import 'dotenv/config'
import { data, User, Post } from '../data/index.js'
import bcrypt from 'bcryptjs'

const { MONGO_URL, MONGO_DBNAME } = process.env

console.log(`📌 Base de datos conectada: ${MONGO_URL}/${MONGO_DBNAME}`);
data.connect(MONGO_URL, MONGO_DBNAME)
    .then(() => {
        return Promise.all([
            User.deleteMany({}),
            Post.deleteMany({})
        ])
            .then(() => bcrypt.hash('123123aa', 10))
            .then(hash => {
                return User.insertMany([
                    { name: 'Abeja Maya', username: 'MayaBee', password: hash, email: 'abeja@maya.com' },
                    { name: 'Pantera Rosa', username: 'PinkPanter', password: hash, email: 'pantera@rosa.com' },
                    { name: 'Daisy Donald', username: 'DonnyDaisy', password: hash, email: 'daisy@donald.com' },
                    { name: 'Minnie Mouse', username: 'MousMin', password: hash, email: 'minnie@mouse.com' },
                    { name: 'Goffrey Hall', username: 'HallGoff', password: hash, email: 'goffrey@hall.com' },
                    { name: 'Pato Donald', username: 'DonnyDuck', password: hash, email: 'pato@donald.com' }
                ])
            })
            .then(([abeja, pantera, daisy, minnie, goffrey, pato]) => {
                return Post.insertMany([
                    { author: abeja.id, image: 'https://media.giphy.com/media/oz4jYoMA0IFTgvmPXL/giphy.gif?cid=790b761146ukyp856nlwgke17khtixuq5olqa7whl801ve4g&ep=v1_gifs_search&rid=giphy.gif&ct=g', text: 'I love honey', likes: [daisy.id, pato.id], createdAt: new Date(2024, 11, 1) }, //nos inventamos una fecha para poder hacer comprobaciones
                    { author: pantera.id, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExejB1N3g0aHVjOHQ3djl0Yzd2NmVhano1N3JuaG51Z3FtajB1MzhvdSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/rtvLZ7DKtjvjO/giphy.gif', text: 'Orghh....', likes: [minnie.id, pato.id] },
                    { author: minnie.id, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnJ1MG5jYXhuZzI1eXl6dzBuNzIybXdzbnZiNjU5ems2dzBhaW1waiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/L45Nt0ttUm4zZ3kmex/giphy.gif', text: 'Dancing with my love..', likes: [goffrey.id] }
                ])
            })
    })
    .finally(() => data.disconnect())

    // node data/populate.js