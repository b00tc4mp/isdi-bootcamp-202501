import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient('mongodb://localhost:27017')

client.connect()
    .then(() => {
        const db = client.db('test')

        const users = db.collection('users')
        const posts = db.collection('posts')

        return Promise.all([
            posts.deleteMany({}),
            users.deleteMany({})
        ])
            .then(() => {
                return users.insertMany([
                    {
                        _id: new ObjectId('67dd9ed19312d9e32d86590a'),
                        name: "Masha Stepanova",
                        email: "masha@gmail.com",
                        username: "masha",
                        password: "123456",
                        createdAt: new Date("2025-01-07T13:43:16.443666"),
                        modifiedAt: null
                    },
                    {
                        _id: new ObjectId('67dd9ed19312d9e32d86590b'),
                        name: "Aaron Barrios",
                        email: "aaron@gmail.com",
                        username: "aaron",
                        password: "123456",
                        createdAt: new Date("2025-01-17T03:45:25.155150"),
                        modifiedAt: null
                    },
                    {
                        _id: new ObjectId('67dd9ed19312d9e32d86590c'),
                        name: "Victor Alvarado",
                        email: "victor@gmail.com",
                        username: "victor",
                        password: "123456",
                        createdAt: new Date("2025-01-20T03:27:55.422538"),
                        modifiedAt: null
                    },
                    {
                        _id: new ObjectId('67dd9ed19312d9e32d86590d'),
                        name: "Camila Torrent",
                        email: "camila@gmail.com",
                        username: "camila",
                        password: "123456",
                        createdAt: new Date("2025-01-19T00:19:08.487973"),
                        modifiedAt: null
                    },
                    {
                        _id: new ObjectId('67dd9ed19312d9e32d86590e'),
                        name: "Sergi",
                        email: "sergi@gmail.com",
                        username: "sergi",
                        password: "123456",
                        createdAt: new Date("2025-01-14T11:06:38.344148"),
                        modifiedAt: null
                    },
                    {
                        _id: new ObjectId('67dd9ed19312d9e32d86590f'),
                        name: "Manu Barzi",
                        email: "manu@gmail.com",
                        username: "manu",
                        password: "123456",
                        createdAt: new Date("2025-01-05T14:13:03.582546"),
                        modifiedAt: null
                    },
                    {
                        _id: new ObjectId('67dd9ed19312d9e32d865910'),
                        name: "Frank Pereira",
                        email: "frank@gmail.com",
                        username: "frank",
                        password: "123456",
                        createdAt: new Date("2025-01-05T23:16:40.510628"),
                        modifiedAt: null
                    }
                ])
            })
            .then(result => {
                const { 0: mashaId, 1: aaronId, 2: victorId, 3: camilaId, 4: sergiId, 5: manuId, 6: frankId } = result.insertedIds

                return posts.insertMany([
                    {
                        _id: new ObjectId('67dd9ed19312d9e32d865911'),
                        authorId: mashaId,
                        imageSrc: "https://i.ibb.co/Mxctt2nG/masha.png",
                        textDescription: "Se van a enterar, tengo un regalito preparado",
                        createdAt: new Date("2025-02-25T10:32:27.000Z"),
                        modifiedAt: null,
                        likes: []
                    },
                    {
                        _id: new ObjectId('67dd9ed19312d9e32d865912'),
                        authorId: aaronId,
                        imageSrc: "https://i.ibb.co/xK9rvJF2/aaron.png",
                        textDescription: "Siendo el mas sexy",
                        createdAt: new Date("2025-02-26T21:11:09.000Z"),
                        modifiedAt: null,
                        likes: [
                            mashaId,
                            victorId
                        ]
                    },
                    {
                        _id: new ObjectId('67dd9ed19312d9e32d865913'),
                        authorId: victorId,
                        imageSrc: "https://i.ibb.co/9kGvPg4C/victor.png",
                        textDescription: "Menuda tarta de queso me ha salido chavales",
                        createdAt: new Date("2025-02-27T10:48:32.000Z"),
                        modifiedAt: null,
                        likes: [
                            mashaId,
                            camilaId
                        ]
                    },
                    {
                        _id: new ObjectId('67dd9ed19312d9e32d865914'),
                        authorId: camilaId,
                        imageSrc: "https://i.ibb.co/hxjTYPyJ/camila.png",
                        textDescription: "Increible como come esta gente, me van a arruinar",
                        createdAt: new Date("2025-02-28T14:19:58.000Z"),
                        modifiedAt: null,
                        likes: [
                            frankId
                        ]
                    },
                    {
                        _id: new ObjectId('67dd9ed19312d9e32d865915'),
                        authorId: manuId,
                        imageSrc: "https://i.ibb.co/21W8fR6Q/manu.png",
                        textDescription: "Hoy no se programa papissss",
                        createdAt: new Date("2025-03-01T15:19:58.000Z"),
                        modifiedAt: null,
                        likes: [
                            frankId
                        ]
                    },
                    {
                        _id: new ObjectId('67dd9ed19312d9e32d865916'),
                        authorId: frankId,
                        imageSrc: "https://i.ibb.co/v4RTvBdq/frank.png",
                        textDescription: "Eldiavlo menuda bellesa",
                        createdAt: new Date("2025-03-03T15:19:58.000Z"),
                        modifiedAt: null,
                        likes: []
                    }
                ])
            })
    })
    .then(result => {
        console.log(result)
    })
    .finally(() => client.close())