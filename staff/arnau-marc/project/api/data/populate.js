import 'dotenv/config'
import { data, User, Game, Season } from '../data/index.js'
import bcrypt from 'bcryptjs'

const { MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
  .then(() => Promise.all([
    User.deleteMany({}),
    Game.deleteMany({}),
    Season.deleteMany({})
  ]))
  .then(() => bcrypt.hash('123123123', 10))
  .then(hash => {
    return User.insertMany([
      { role: 'admin', name: 'Arnau', surname: 'Romero', email: 'aromerohazas@gmail.com', username: 'arnau_sots', password: hash },
      { role: 'admin', name: 'Marc', surname: 'Ramos', email: 'marcramosjorda@gmail.com', username: 'marcramos13', password: hash },
      { role: 'regular', name: 'Alex', surname: 'Domingo', email: 'domi11@gmail.com', username: 'domi11', password: hash },
      { role: 'regular', name: 'Eyla', surname: 'Garcia', email: 'eyla@gmail.com', username: 'eyla_garcia', password: hash },
      { role: 'regular', name: 'lita', surname: 'lenta', email: 'lita@gmail.com', username: 'lita_lenta', password: hash }
    ])
  })
  .then(([arnau, marc, alex, eyla, lita]) => {
    return Game.insertMany([
      // WINTER SEASON
      { // Win alex 2 points
        author: arnau._id, 
        status: 'finished',
        season: 'Winter Season',
        title: 'Saturday night timba', 
        participants: [alex._id, marc._id, lita._id], 
        date: '22-02-2025',
        place: 'Bodega',
        winner: alex._id,
        points: 2,
        createdAt: new Date(2025, 3, 1),
        modifiedAt: new Date()
      },
      { // Win arnau 2 points
        author: marc._id, 
        status: 'finished',
        season: 'Winter Season',
        title: 'Sunday night timba', 
        participants: [arnau._id, marc._id], 
        date: '24-02-2025',
        place: 'Bodega',
        winner: arnau._id,
        points: 2,
        createdAt: new Date(2025, 2, 2),
        modifiedAt: new Date()
      },
      { // Eyla win 3.5 points
        author: marc._id, 
        status: 'finished',
        season: 'Winter Season',
        title: 'Sunday night timba', 
        participants: [arnau._id, marc._id, alex._id, eyla._id, lita._id], 
        date: '26-02-2025',
        place: 'Bodega',
        winner: eyla._id,
        points: 3.5,
        createdAt: new Date(2025, 2, 2),
        modifiedAt: new Date()
      },
      { 
        author: marc._id, 
        status: 'finished',
        season: 'Winter Season',
        title: 'Sunday night timba', 
        participants: [arnau._id, marc._id, alex._id, eyla._id, lita._id], 
        date: '28-02-2025',
        place: 'Bodega',
        winner: marc._id,
        points: 3.5,
        createdAt: new Date(2025, 2, 2),
        modifiedAt: new Date()
      },
      { // Eyla win 2 points
        author: arnau._id, 
        status: 'finished',
        season: 'Winter Season',
        title: 'Saturday night timba', 
        participants: [alex._id, marc._id, eyla._id], 
        date: '01-03-2025',
        place: 'Bodega',
        winner: eyla._id,
        points: 2,
        createdAt: new Date(2025, 3, 1),
        modifiedAt: new Date()
      },
      // SEASON 1
      { // Scheduled
        author: marc._id, 
        status: 'scheduled',
        season: 'season 1',
        title: 'Sunday night timba', 
        participants: [arnau._id, marc._id, alex._id, eyla._id, lita._id], 
        date: '03-03-2025',
        place: 'Bodega',
        winner: null,
        points: 0,
        createdAt: new Date(2025, 2, 2),
        modifiedAt: new Date()
      },
      { // Scheduled
        author: arnau._id, 
        status: 'scheduled',
        season: 'season 1',
        title: 'Sunday night timba', 
        participants: [arnau._id, marc._id, alex._id, eyla._id, lita._id], 
        date: '06-03-2025',
        place: 'Bodega',
        winner: null,
        points: 0,
        createdAt: new Date(2025, 2, 2),
        modifiedAt: new Date()
      },
      { // Win eyla 3.5 points
        author: marc._id, 
        status: 'finished',
        season: 'season 1',
        title: 'Sunday night timba', 
        participants: [arnau._id, marc._id, alex._id, eyla._id, lita._id], 
        date: '09-03-2025',
        place: 'Bodega',
        winner: eyla._id,
        points: 3.5,
        createdAt: new Date(2025, 2, 2),
        modifiedAt: new Date()
      },
      { // Win eyla 3.5 points
        author: marc._id, 
        status: 'finished',
        season: 'season 1',
        title: 'Sunday night timba', 
        participants: [arnau._id, marc._id, alex._id, eyla._id, lita._id], 
        date: '12-03-2025',
        place: 'Bodega',
        winner: arnau._id,
        points: 3.5,
        createdAt: new Date(2025, 2, 2),
        modifiedAt: new Date()
      },
      { // Win marc 3.5 points
        author: marc._id, 
        status: 'finished',
        season: 'season 1',
        title: 'Sunday night timba', 
        participants: [arnau._id, marc._id, alex._id, eyla._id, lita._id], 
        date: '15-03-2025',
        place: 'Bodega',
        winner: marc._id,
        points: 2.5,
        createdAt: new Date(2025, 2, 2),
        modifiedAt: new Date()
      },
      { // Win marc 2.5 points
        author: marc._id, 
        status: 'finished',
        season: 'season 1',
        title: 'Sunday night timba', 
        participants: [ marc._id, alex._id, eyla._id, lita._id], 
        date: '18-03-2025',
        place: 'Bodega',
        winner: marc._id,
        points: 2.5,
        createdAt: new Date(2025, 2, 2),
        modifiedAt: new Date()
      },
      { // Win arnau 2 points
        author: marc._id, 
        status: 'finished',
        season: 'season 1',
        title: 'Sunday night timba', 
        participants: [arnau._id, eyla._id, lita._id], 
        date: '21-03-2025',
        place: 'Bodega',
        winner: arnau._id,
        points: 2,
        createdAt: new Date(2025, 2, 2),
        modifiedAt: new Date()
      },
    ])
    .then(([game1, game2]) => {
      return Season.insertMany([
        { 
          startDate: new Date(2025, 2, 1),
          endDate: new Date(2025, 5, 1),
          status: 'active',
          name: 'season 1',
          games: game1._id,
          participants: [arnau._id, marc._id],
          createdAt: new Date(2025, 2, 1),
          modifiedAt: new Date()
        },
        { 
          startDate: new Date(2025, 6, 1),
          endDate: new Date(2025, 9, 1),
          status: 'finished',
          name: 'Summer Season',
          games: game2._id,
          participants: [marc._id, arnau._id],
          createdAt: new Date(2025, 6, 1),
          modifiedAt: new Date()
        }
      ])
    })
  })
  .then(() => {
    console.log('✅ Datos insertados correctamente.')
  })
  .catch(error => {
    console.error('❌ Error al insertar datos:', error)
  })
  .finally(() => data.disconnect())