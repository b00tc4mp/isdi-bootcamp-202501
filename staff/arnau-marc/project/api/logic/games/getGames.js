import { Game } from '../../data/index.js'

export const getGames = () => {
  return Game.find()
    .sort({ date: -1 }) // ordenados por fecha descendente
    .lean()
    .catch(error => { throw new Error('Error retrieving events: ' + error.message) })
}
