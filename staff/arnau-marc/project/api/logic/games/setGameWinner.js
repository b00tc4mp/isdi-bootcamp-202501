import { Game, User, Season } from '../../data/models/Game.js'

export const setGameWinner = (adminId, gameId, winnerId) => {
  return User.findById(adminId)
    .then(admin => {
      if (!admin || admin.role !== 'admin') throw new Error('Only admins can set winners')

      return Game.findById(gameId)
    })
    .then(game => {
      if (!game) throw new Error('Game not found')

      if (!game.participants.includes(winnerId)) {
        throw new Error('Winner must be one of the participants')
      }

      return User.find({ _id: { $in: game.participants } })
        .then(participants => {
          let points = 0
          participants.forEach(p => {
            points += p.role === 'admin' ? 1 : 0.5
          })

          game.winner = winnerId
          game.points = points
          game.status = 'finished'

          return game.save()
        })
    })
}

export default setGameWinner