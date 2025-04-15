import { Game, Season } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'

const { SystemError, NotFoundError } = errors

export const getUserStats = (userId) => {
  validate.id(userId, 'userId')

  return Season.findOne({ status: 'active' })
    .catch(error => { throw new SystemError(error.message) })
    .then(season => {
      if (!season) throw new NotFoundError('No active season found')

      return Game.find({ season: season.name, status: 'finished' }).lean()
    })
    .catch(error => { throw new SystemError(error.message) })
    .then(games => {
      let gamesPlayed = 0
      let gamesWon = 0

      games.forEach(game => {
        const participated = game.participants.some(p => p.toString() === userId)
        if (participated) gamesPlayed++

        const won = Array.isArray(game.winner)
          ? game.winner.some(p => p.toString() === userId)
          : game.winner?.toString() === userId

        if (won) gamesWon++
      })

      const winRate = gamesPlayed ? Math.round((gamesWon / gamesPlayed) * 1000) / 10 : 0

      return {
        gamesPlayed,
        gamesWon,
        winRate
      }
    })
}


/*
import { Game, Season } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'

const { SystemError, NotFoundError } = errors

export const getUserStats = (userId) => {
  validate.id(userId, 'userId')

  return Season.findOne({ status: 'active' })
    .catch(error => { throw new SystemError(error.message) })
    .then(season => {
      if (!season) throw new NotFoundError('No active season found')

      return Game.find({ season: season.name, status: 'finished' })
        .catch(error => { throw new SystemError(error.message) })
        .then(games => {
          const userGames = []
          let wins = 0
    
          games.forEach(game => {
            const participant = game.participants.find(p => p.user.toString() === userId)
            if (participant) {
              userGames.push(participant)
            }
          })

          games.forEach(game => {
            const winFind = game.winner.find(p => p.user.toString() === userId)
            if (winFind) {
              wins++
            }
          })

          const gamesPlayed = userGames.length
          const winRate = gamesPlayed ? Math.round((wins / gamesPlayed) * 1000) / 10 : 0
         
          return {
            gamesPlayed,
            gamesWon: wins,
            winRate
          }
        })
    })
}
*/