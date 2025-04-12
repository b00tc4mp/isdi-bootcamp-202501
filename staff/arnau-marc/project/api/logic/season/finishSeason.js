import { User, Season, Game } from '../../data/index.js'
import { errors } from 'com'

const { SystemError, NotAllowedError, NotFoundError } = errors

export const finishSeason = (userId, seasonId) => {
  return User.findById(userId).lean()
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) throw new NotFoundError('User not found')
      if (user.role !== 'admin') throw new NotAllowedError('Only admins can finish a season')

      return Season.findById(seasonId)
    })
    .then(season => {
      if (!season) throw new NotFoundError('Season not found')

      //  Buscar todos los juegos finalizados de esta season
      return Game.find({ season: seasonId, status: 'finished' }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(games => {
          const leaderboard = {}

          games.forEach(game => {
            game.participants.forEach(userId => {
              if (!leaderboard[userId]) leaderboard[userId] = 0
            })

            if (game.winner) {
              if (!leaderboard[game.winner]) leaderboard[game.winner] = 0
              leaderboard[game.winner] += game.points || 0
            }
          })

          //  Determinar el jugador con más puntos
          const sorted = Object.entries(leaderboard)
            .map(([userId, points]) => ({ userId, points }))
            .sort((a, b) => b.points - a.points)

          const winnerEntry = sorted[0] // el que tiene más puntos

          //  Actualizar la season
          season.status = 'finished'
          season.winner = winnerEntry?.userId || null

          return season.save()
        })
    })
}
