import 'dotenv/config'
import { User, Post, ObjectId, data } from './../data/index.js'
import bcrypt from 'bcryptjs'

const { MONGO_URL, MONGO_DB } = process.env

const mashaId = new ObjectId('67dd9ed19312d9e32d86590a')
const aaronId = new ObjectId('67dd9ed19312d9e32d86590b')
const victorId = new ObjectId('67dd9ed19312d9e32d86590c')
const camilaId = new ObjectId('67dd9ed19312d9e32d86590d')
const sergiId = new ObjectId('67dd9ed19312d9e32d86590e')
const manuId = new ObjectId('67dd9ed19312d9e32d86590f')
const frankId = new ObjectId('67dd9ed19312d9e32d865910')

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        return Promise.all([
            Post.deleteMany({}),
            User.deleteMany({})
        ])
            .then(() => bcrypt.hash('123456', 10))
            .then(hash => {
                return User.insertMany([
                    {
                        _id: mashaId,
                        name: "Masha Stepanova",
                        email: "masha@gmail.com",
                        username: "masha",
                        password: hash,
                        createdAt: new Date("2025-01-07T13:43:16.443666"),
                        modifiedAt: null
                    },
                    {
                        _id: aaronId,
                        name: "Aaron Barrios",
                        email: "aaron@gmail.com",
                        username: "aaron",
                        password: hash,
                        createdAt: new Date("2025-01-17T03:45:25.155150"),
                        modifiedAt: null
                    },
                    {
                        _id: victorId,
                        name: "Victor Alvarado",
                        email: "victor@gmail.com",
                        username: "victor",
                        password: hash,
                        createdAt: new Date("2025-01-20T03:27:55.422538"),
                        modifiedAt: null
                    },
                    {
                        _id: camilaId,
                        name: "Camila Torrent",
                        email: "camila@gmail.com",
                        username: "camila",
                        password: hash,
                        createdAt: new Date("2025-01-19T00:19:08.487973"),
                        modifiedAt: null
                    },
                    {
                        _id: sergiId,
                        name: "Sergi",
                        email: "sergi@gmail.com",
                        username: "sergi",
                        password: hash,
                        createdAt: new Date("2025-01-14T11:06:38.344148"),
                        modifiedAt: null
                    },
                    {
                        _id: manuId,
                        name: "Manu Barzi",
                        email: "manu@gmail.com",
                        username: "manu",
                        password: hash,
                        createdAt: new Date("2025-01-05T14:13:03.582546"),
                        modifiedAt: null
                    },
                    {
                        _id: frankId,
                        name: "Frank Pereira",
                        email: "frank@gmail.com",
                        username: "frank",
                        password: hash,
                        createdAt: new Date("2025-01-05T23:16:40.510628"),
                        modifiedAt: null
                    }
                ])
            })
            .then(() => {
                return Post.insertMany([
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
    .finally(() => data.disconnect())