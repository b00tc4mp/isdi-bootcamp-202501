import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { data, User, Post } from '../data/index.js'

const { MONGO_URL, MONGO_DB } = process.env;

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        return Promise.all([
            User.deleteMany({}),
            Post.deleteMany({})
        ])
            .then(() => bcrypt.hash('123123123', 10))
            .then(hash => {
                return User.insertMany([
                    { name: 'admin', email: 'admin@admin.com', username: 'admin', password: hash },
                    { name: 'John Doe', email: 'johndoe@doe.com', username: 'johndoe', password: hash },
                    { name: 'Alexander', email: 'alexander@gmail.com', username: 'alexander', password: hash },
                ])
            })
            .then(([admin, john, alex]) => {
                return Post.insertMany([
                    { author: admin.id, image: 'https://www.frutas-hortalizas.com/img/fruites_verdures/presentacio/59.jpg', text: 'potato', likes: [alex.id], createdAt: new Date },
                    { author: john.id, image: 'https://ih1.redbubble.net/image.2973243766.9895/raf,360x360,075,t,fafafa:ca443f4786.jpg', text: 'pollo', likes: [], createdAt: new Date },
                    { author: admin.id, image: 'https://preview.redd.it/i-gtg-take-a-piss-can-you-look-after-my-pet-for-a-sec-v0-8e7uecsmusde1.png?auto=webp&s=0c584ee7041bb6629e95434fbd2103f49dd8fce0', text: 'lmaoo', likes: [john.id, alex.id], createdAt: new Date }
                ])
            })

    })
    .finally(() => data.disconnect())