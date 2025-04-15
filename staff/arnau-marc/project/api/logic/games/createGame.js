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

      if (!user) throw new NotFoundError('User not found')

      if (user.role !== 'admin') throw new AuthorizationError('Only admins can create games')


      const newGame = new Game({
        author: userId,
        title,
        season: season || null,
        date,
        place,
        status: 'scheduled',
        participants: [],
        winner: null,
        points: 0
      })

      return newGame.save()
    })
}