import { User, Game } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'

const { ValidationError, NotFoundError, AuthorizationError } = errors

export const createGame = (userId, title, season, date, place) => {
  validate.id(userId, 'userId')
  validate.title(title)
  validate.season(season)
  validate.place(place)

  if (!title || !date || !place) throw new ValidationError('Missing required fields')

  return User.findById(userId)
    .then(user => {
<<<<<<< HEAD
      if (!user) throw new Error('User not found')
      if (user.role !== 'admin') throw new Error('Only admins can create games')
=======
      if (!user) throw new NotFoundError('User not found')

      if (user.role !== 'admin') throw new AuthorizationError('Only admins can create games')
>>>>>>> 5db12c2891bf9e80234498fd35bbf696a393d142

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