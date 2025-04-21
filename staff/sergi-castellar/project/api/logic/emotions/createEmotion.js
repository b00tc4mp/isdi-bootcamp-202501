import { Emotion, Couple } from '../../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const createEmotion = (userId, emotion) => {
    validate.id(userId, 'userId')
    validate.emotion(emotion, 'emotion')

    return Couple.findOne({ members: userId }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(couple => {
            if (!couple) throw new NotFoundError('Couple not found')

            return Emotion.findOneAndUpdate(
                {
                    author: userId
                },
                {
                    couple: couple._id,
                    author: userId,
                    emotion,
                    createdAt: new Date(),
                    modifiedAt: null
                },
                { upsert: true, new: true, setDefaultsOnInsert: true })
                .catch(error => { throw new SystemError(error.message) })
        })
}
