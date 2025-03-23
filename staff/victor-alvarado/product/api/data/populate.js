import { MongoClient } from 'mongodb'

const client = new MongoClient('mongodb://localhost:27017')

client.connect()
    .then(() => {
        const db = client.db('test')

        const users = db.collection('users')
        const posts = db.collection('posts')

        return Promise.all([
            users.deleteMany(),
            posts.deleteMany()
        ])
            .then(() => {
                return users.insertMany([
                    { name: 'IronMan', email: 'iron@man.com', username: 'ironMan', password: '123123123' },
                    { name: 'Grood', email: 'grood@grood.com', username: 'grood', password: '123123123' },
                    { name: 'spiderMan', email: 'spider@man.com', username: 'spiderMan', password: '123123123' },
                    { name: 'hulk', email: 'hulk@verde.com', username: 'hulk', password: '123123123' },
                ])
            })
            .then(result => {
                const { 0: IronManId, 1: GroodId, 2: spiderManId, 3: hulkId } = result.insertedIds

                return posts.insertMany([
                    { author: IronManId, image: 'https://media1.tenor.com/m/McY9R4_xYOIAAAAC/iron-man-tony-stark.gif', text: 'Soy iron man', likes: [GroodId, spiderManId], createdAt: new Date, modifiedAt: null },
                    { author: GroodId, image: 'https://media4.giphy.com/media/R97jJCEGEmh0I/giphy.gif?cid=6c09b95230ylflnu6jpg29lusjfb0815mklm1ts7x7p33z6t&ep=v1_gifs_search&rid=giphy.gif&ct=g', text: 'hola', likes: [], createdAt: new Date, modifiedAt: null },
                    { author: spiderManId, image: 'https://media1.tenor.com/m/6qYEVu_G1wkAAAAC/ninja-aranha.gif', text: 'hola!!', likes: [], createdAt: new Date, modifiedAt: null }
                ])
            })
    })
    .then(result => {
        console.log(result)
    })
    .finally(() => client.close())