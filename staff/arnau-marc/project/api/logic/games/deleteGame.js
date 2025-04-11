import { Game, User } from '../../data/index.js'
// import errors, validate

export const deleteGame = (gameId, userId) => {
    // validate

    return User.findById(userId)
        .catch(error => { throw new Error(error.message) }) 
        .then(user => {
            if (!user) throw new Error('user not found')
            if (user.role !== 'admin') throw new Error('only admin can delete a game')      
                
            return Game.findById(gameId)
                .catch(error => { throw new Error(error.message) })
                .then(game => {
                    if (!game) throw new Error('game not found')
                    
                    return Game.deleteOne({ _id: gameId })
                        .catch(error => { throw new Error(error.message) })
                })    
        })
        .then (() => {})
}