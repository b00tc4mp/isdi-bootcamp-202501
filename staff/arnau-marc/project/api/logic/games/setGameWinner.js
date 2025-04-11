import { Game, User, Season } from '../../data/index.js'

export const setGameWinner = (adminId, gameId, winnerUsername) => {
  return User.findById(adminId).lean()
    .then(admin => {
      if (!admin || admin.role !== 'admin') throw new Error('Only admins can set winners')

      return Promise.all([
        Game.findById(gameId),
        User.findOne({ username: winnerUsername }).lean(),
      ])
    })
    .then(([game ,user]) => {
      if (!game) throw new Error('Game not found')
      if (!user) throw new Error('User not found')

      if (!game.participants.toString().includes(user._id.toString())) {
        throw new Error('Winner must be one of the participants')
      }

      return User.find({ _id: { $in: game.participants } })
        .then(participants => {
          let points = 0
          participants.forEach(p => {
            points += p.role === 'admin' ? 1 : 0.5
          })

          game.winner = user._id
          game.points = points
          game.status = 'finished'

          return game.save()
        })
    })
}

export default setGameWinner