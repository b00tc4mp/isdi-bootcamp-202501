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
                    { name: 'Harry Potter', email: 'harry@potter.com', username: 'GryffindorSeeker', house: 'gryffindor', password: '123123123' },
                    { name: 'Hermione Granger', email: 'hermione@granger.com', username: 'Granger', house: 'gryffindor', password: '123123123' }
                ])
            })
            .then(result => {
                const { 0: harryId, 1: hermioneId } = result.insertedIds

                return posts.insertMany([
                    { author: harryId, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWl4dmRudTRlY3Vnb281emp0bG1ldnhsY3l0bWxxb2Zhb3Y5ODdmaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mz1kJeDVueKC4/giphy.gif', text: 'Searching my wand', likes: [], createdAt: new Date, modifiedAt: null },
                    { author: hermioneId, image: 'https://media.giphy.com/media/IWvuFVQICQIr6/giphy.gif?cid=790b76118lomln5febmjku33rteti54ptvt8t5jlohw9bday&ep=v1_gifs_search&rid=giphy.gif&ct=g', text: 'It is leviosa, not leviosaaa', likes: [harryId], createdAt: new Date, modifiedAt: null }
                ])
            })
    })
    .then(result => {
        console.log(result)
    })
    .finally(() => client.close())