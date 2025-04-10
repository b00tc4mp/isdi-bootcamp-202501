import { User } from '../../data/index.js'

export function getUserRole(userId) {
  return User.findById(userId)
    .then(user => {
      if (!user) throw new Error('User not found')

      return user.role
    })
}