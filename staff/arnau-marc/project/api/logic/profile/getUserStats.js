import { Game, Season } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'

const { SystemError, NotFoundError } = errors

export const getUserStats = (userId) => {
  validate.id(userId, 'user id')

  return Season.findOne({ status: 'active' })
    .catch(error => { throw new SystemError(error.message) })
    .then(season => {
      if (!season) throw new NotFoundError('No active season found')

      return Game.find({ status: 'finished' })
        .catch(error => { throw new SystemError(error.message) })
        .then(games => {
          const userGames = []
          let wins = 0
          let totalPoints = 0
    
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
