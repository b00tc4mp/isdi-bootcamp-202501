import { User, Level } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const isLevelPassed = (userId, levelId, userAnswer) => {
    validate.id(userId, 'userId')
    validate.id(levelId, 'levelId')
    validate.string(userAnswer, 'userAnswer')
    validate.minLength(userAnswer, 1, 'userAnswer')
    validate.maxLength(userAnswer, 100, 'userAnswer')

    let levelIsPassed

    return Promise.all([
        User.findById(userId).lean(),
        Level.findById(levelId).lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, level]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!level) throw new NotFoundError('level not found')

            levelIsPassed = level.expectedResult === userAnswer

            if (levelIsPassed) {
                return Level.find().select('_id').lean()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(levelIds => {
                        let index = levelIds.findIndex(objectId => objectId._id.toString() === levelId)

                        if (!(user.generalProgress.find(levelObjectId => levelObjectId._id.toString() === levelId))) {
                            user.generalProgress.push(level._id)

                            const generalProgress = user.generalProgress

                            const score = user.score + level.difficulty

                            const currentLevel = user.currentLevel = levelIds[index + 1]

                            return User.updateOne({ _id: userId }, { $set: { generalProgress, currentLevel, score } })
                        }
                    })
                    .catch(error => { throw new SystemError(error.message) })
            }
        })
        .then(() => levelIsPassed)
}


