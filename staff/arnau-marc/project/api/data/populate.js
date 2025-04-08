import 'dotenv/config'
import { data, User, Game, Season } from '../data/index.js'
import bcrypt from 'bcryptjs'

const { MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
    .then(() => {
        return Promise.all([
            User.deleteMany({}),
            Game.deleteMany({}),
            Season.deleteMany({})
        ])
            .then(() => bcrypt.hash('123123123', 10))
            .then(hash => {
                return User.insertMany([
                    { role: 'admin', name: 'Arnau', surname: 'Romero', email: 'aromerohazas@gmail.com', username: 'arnau_sots', password: hash },
                    { role: 'admin', name: 'Marc', surname: 'Ramos', email: 'marcramosjorda@gmail.com', username: 'marcramos13', password: hash },
                    { role: 'regular', name: 'Alex', surname: 'Domingo', email: 'domi11@gmail.com', username: 'domi11', password: hash }
                ])
            })
            .then(([arnau, marc, alex]) => {
                return Game.insertMany([
                    { 
                        author: arnau.id, 
                        status: 'scheduled',
                        title: 'Saturday night timba', 
                        participants: [alex.id, marc.id], 
                        date: new Date(2025, 2, 1),
                        place: 'Bodega',
                        winner: '',
                        points: 0,
                        createdAt: new Date(2025, 2, 1),
                        modifiedAt: new Date()
                    },
                    { 
                        author: marc.id, 
                        status: 'finished',
                        title: 'Sunday night timba', 
                        participants: [arnau.id, marc.id], 
                        date: new Date(2025, 2, 2),
                        place: 'Bodega',
                        winner: '',
                        points: 0,
                        createdAt: new Date(2025, 2, 2),
                        modifiedAt: new Date()
                    },
                ])
            })
            .then(([game1, game2]) => {
                return Season.insertMany([
                    { 
                        startDate: new Date(2025, 2, 1),
                        endDate: new Date(2025, 5, 1),
                        name: 'Winter Season',
                        maxGames: 10,
                        participants: [game1, game2],
                        createdAt: new Date(2025, 2, 1),
                        modifiedAt: new Date()
                    },
                    { 
                        startDate: new Date(2025, 6, 1),
                        endDate: new Date(2025, 9, 1),
                        name: 'Summer Season',
                        maxGames: 10,
                        participants: [game1, game2],
                        createdAt: new Date(2025, 6, 1),
                        modifiedAt: new Date()
                    }
                ])
            })
    })
    .finally(() => data.disconnect())