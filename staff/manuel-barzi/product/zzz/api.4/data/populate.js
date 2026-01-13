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
                    { name: 'Pepito Grillo', email: 'pepito@grillo.com', username: 'pepitogrillo', password: '123123123' },
                    { name: 'Campa Nilla', email: 'campa@nilla.com', username: 'campanilla', password: '123123123' },
                    { name: 'Peter Pan', email: 'peter@pan.com', username: 'peterpan', password: '123123123' },
                    { name: 'Wendy Darling', email: 'wendy@darling.com', username: 'wendydarling', password: '123123123' },
                    { name: 'James Hook', email: 'james@hook.com', username: 'jameshook', password: '123123123' },
                    { name: 'Pin Ocho', email: 'pin@ocho.com', username: 'pinocho', password: '123123123' }
                ])
            })
            .then(result => {
                const { 0: pepitoId, 1: campaId, 2: peterId, 3: wendyId, 4: jamesId, 5: pinId } = result.insertedIds

                return posts.insertMany([
                    { author: pepitoId, image: 'https://media.giphy.com/media/sTczweWUTxLqg/giphy.gif?cid=790b7611mnwf959ak21rbewl2jsp9b2a8wu6x7vxif4eism5&ep=v1_gifs_trending&rid=giphy.gif&ct=g', text: 'free day!', likes: [peterId, wendyId], createdAt: new Date, modifiedAt: null },
                    { author: pepitoId, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW53Zjk1OWFrMjFyYmV3bDJqc3A5YjJhOHd1Nng3dnhpZjRlaXNtNSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/uQgXjl505BdYAv8H0X/giphy.gif', text: 'i am free!', likes: [], createdAt: new Date, modifiedAt: null },
                    { author: wendyId, image: 'https://media.giphy.com/media/yoJC2GnSClbPOkV0eA/giphy.gif?cid=790b7611mnwf959ak21rbewl2jsp9b2a8wu6x7vxif4eism5&ep=v1_gifs_trending&rid=giphy.gif&ct=g', text: 'so happy for you... mf', likes: [peterId], createdAt: new Date, modifiedAt: null }
                ])
            })
    })
    .then(result => {
        console.log(result)
    })
    .finally(() => client.close())