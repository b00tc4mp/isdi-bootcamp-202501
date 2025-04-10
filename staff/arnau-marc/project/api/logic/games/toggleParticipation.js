import { User, Game } from '../../data/index.js'
// import { errors, validate } from 'com'

// const { SystemError, NotFoundError, ConflictError } = errors

export const toggleParticipation = (userId, gameId) => {
 //   validate.id(userId, 'userId')
   // validate.id(gameId, 'gameId')

    return Promise.all([
        User.findById(userId).lean(),
        Game.findById(gameId).lean()
    ])
        .catch(error => { throw new Error(error.message) })
        .then(([user, game]) => {
            if (!user) throw new Error('User not found')
            if (!game) throw new Error('Game not found')
            if (game.status !== 'scheduled') throw new Error('Cannot toggle participation in a finished game')

            const { participants } = game

            const index = participants.findIndex(userObjectId => userObjectId.toString() === userId)

            if (index < 0) {
                participants.push(userId)
            } else {
                participants.splice(index, 1)
            }

            return Game.updateOne({ _id: gameId }, { $set: { participants } })
                .catch(error => { throw new Error(error.message) })
                .then(() => {})
        })
}