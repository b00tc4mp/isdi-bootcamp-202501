import 'dotenv/config'
import { User, Post, data, ObjectId } from './index.js'
import bcrypt from 'bcryptjs'

const { MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        return Promise.all([
            User.deleteMany({}),
            Post.deleteMany({})
        ])
            .then(() => bcrypt.hash('123123123', 10))
            .then(hash => {
                return User.insertMany([
                    {
                        name: "Sergi",
                        email: "ser@gi.com",
                        username: "serchi",
                        password: hash,
                    },
                    {
                        name: "Aaron",
                        email: "aa@ron.com",
                        username: "aaron",
                        password: hash,
                    },
                    {
                        name: "Eugeni",
                        email: "eu@geni.com",
                        username: "eugeni",
                        password: hash,
                    },
                    {
                        name: "Luciano",
                        email: "luci@ano.com",
                        username: "lucho",
                        password: hash,
                    },
                    {
                        name: "Victor",
                        email: "vic@tor.com",
                        username: "victor",
                        password: hash,
                    },
                    {
                        name: "Arnau",
                        email: "ar@nau.com",
                        username: "arnau",
                        password: hash,
                    },
                    {
                        name: "Marc",
                        email: "ma@rc.com",
                        username: "marc",
                        password: hash,
                    },
                ])
            })
            .then(([serchi, aaron, eugeni, lucho, victor, arnau, marc]) => {
                return Post.insertMany([

                    {
                        author: eugeni.id,
                        image: 'https://imagenes.20minutos.es/files/image_990_556/uploads/imagenes/2023/08/24/plato-de-fuet.jpeg',
                        text: "There's nothing better than start a day with a good thick fuet",
                        likes: [

                        ]
                    },
                    {
                        author: serchi.id,
                        image: 'https://www.clarin.com/2023/09/07/cCaGHbWDq_720x0__1.jpg',
                        text: 'Preparing nice anti-aging cocktail. Very recommended!!!',
                        likes: [

                        ]
                    },
                    {
                        author: lucho.id,
                        image: 'https://www.annarecetasfaciles.com/files/alfajores-de-maicena-rellenos-de-dulce-de-leche.jpg',
                        text: 'Old but gold (not me, alfajores)',
                        likes: [

                        ]
                    },
                    {
                        author: victor.id,
                        image: 'https://imageproxy.wolt.com/assets/673214851f2eff71374fbea2',
                        text: 'Reconnecting with my homeland, so yummy!',
                        likes: [
                        ]
                    }
                ])
            })
    })
    .finally(() => data.disconnect())

