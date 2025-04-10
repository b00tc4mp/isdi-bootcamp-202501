import { User, Game } from '../../data/index.js'

export const setGameWinner = (adminId, gameId, winnerId) => {
    return User.findById(adminId)
      .then(user => {
        if (!user || user.role !== 'admin') throw new Error('Only admins can set the winner')
  
        return Game.findById(gameId)
      })
      .then(game => {
        if (!game) throw new Error('Game not found')
        if (!game.participants.includes(winnerId)) throw new Error('Winner must be a participant')
  
        // Calcular puntos
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