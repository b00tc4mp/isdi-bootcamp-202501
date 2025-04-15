import { Game, User } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'

const { SystemError } = errors

export const getSeasonLeaderboard = (seasonName) => {
    return Game.find({ season: seasonName, status: 'finished'}).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(games => {
            if (!games.length) return []

            const leaderboard = {}

            games.forEach(game => {
                // Asegurar que todos los participantes existan
                game.participants.forEach(userId =>{
                    if (!leaderboard[userId]) leaderboard[userId] = 0
                })

                // Sumar puntos al ganador si existe
                if (game.winner){
                    if(!leaderboard[game.winner]) leaderboard[game.winner] = 0
                    leaderboard[game.winner] += game.points || 0
                }
            })
        
            // Devolver como array ordenado
            return Object.entries(leaderboard)
                .map(([userId, points]) => ({ userId, points}))
                .sort((a, b) => b.points - a.points)
    })
    .then(leaderboard => {
        // Obtener nombres de usuario para mostrar en frontend
        const userIds = leaderboard.map(e => e.userId)

        return User.find({_id: { $in: userIds } }).lean()
            .catch(error => { throw new SystemError(error.message) })
            .then(users => {
                const userMap = Object.fromEntries(users.map(u => [u._id.toString(), u.username]))

                return leaderboard.map(entry => ({
                    username: userMap[entry.userId] || 'Desconocido',
                    points: entry.points
                }))
            })
    })
}