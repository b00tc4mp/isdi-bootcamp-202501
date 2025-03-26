import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'

const client = new MongoClient('mongodb://localhost:27017');

client.connect()
    .then(() => {
        const db = client.db('test');

        const users = db.collection('users');
        const posts = db.collection('posts');

        return Promise.all([
            users.deleteMany(),
            posts.deleteMany()
        ])
            .then(() => bcrypt.hash('123123123', 10))
            .then(hash => {
                return users.insertMany([
                    { name: 'admin', email: 'admin@admin.com', username: 'admin', password: hash },
                    { name: 'John Doe', email: 'johndoe@doe.com', username: 'johndoe', password: hash },
                    { name: 'Alexander', email: 'alexander@gmail.com', username: 'alexander', password: hash },
                ])
            })
            .then(result => {
                const { 0: adminId, 1: johnId, 2: alexanderId } = result.insertedIds

                return posts.insertMany([
                    { author: adminId, image: 'https://www.frutas-hortalizas.com/img/fruites_verdures/presentacio/59.jpg', text: 'potato', likes: [alexanderId], createdAt: new Date, modifiedAt: null },
                    { author: johnId, image: 'https://ih1.redbubble.net/image.2973243766.9895/raf,360x360,075,t,fafafa:ca443f4786.jpg', text: 'pollo', likes: [], createdAt: new Date, modifiedAt: null },
                    { author: adminId, image: 'https://preview.redd.it/i-gtg-take-a-piss-can-you-look-after-my-pet-for-a-sec-v0-8e7uecsmusde1.png?auto=webp&s=0c584ee7041bb6629e95434fbd2103f49dd8fce0', text: 'lmaoo', likes: [johnId, alexanderId], createdAt: new Date, modifiedAt: null }
                ])
            })

    })
    .then(result => {
        console.log(result)
    })
    .finally(() => client.close())