import { Emotion, Couple } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const retrieveTodayEmotions = (userId) => {
    validate.id(userId, 'userId')

    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)

    return Couple.findOne({ members: userId }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(couple => {
            if (!couple) throw new NotFoundError('Couple not found')

            return Emotion.find({
                couple: couple._id,
                createdAt: { $gte: startOfDay }
            }).lean()
        })
        .then(emotions => {
            const userEmotion = emotions.find(emotion => emotion.author.toString() === userId)
            const partnerEmotion = emotions.find(emotion => emotion.author.toString() !== userId)

            return { userEmotion: userEmotion ? userEmotion.emotion : null, partnerEmotion: partnerEmotion ? partnerEmotion.emotion : null }
        })
}
