import { User, Game } from '../../data/index.js'

export const createGame = (userId, title, season, date, place) => {
  if (!title || !date || !place) throw new Error('Missing required fields')

  return User.findById(userId)
    .then(user => {
      if (!user) throw new Error('User not found')
      if (user.role !== 'admin') throw new Error('Only admins can create games')

      const newGame = new Game({
        author: userId,
        title,
        date,
        place,
        season: season || null,
        status: 'scheduled',
        participants: [],
        winner: null,
        points: 0
      })

      return newGame.save()
    })
}