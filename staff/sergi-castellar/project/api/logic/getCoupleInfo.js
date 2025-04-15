import { User, Couple } from './../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export const getCoupleInfo = (userId) => {
    validate.id(userId, 'userId')

    return Couple.findOne({ members: userId }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(couple => {
            if (!couple) throw new NotFoundError('couple not found')

            const partnerId = couple.members.find(id => id.toString() !== userId.toString())

            return User.findById(partnerId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(partner => {
                    if (!partner) throw new NotFoundError('partner not found')

                    const startDate = new Date(couple.dateStart)
                    const currentDate = new Date()
                    const timeDifference = currentDate - startDate
                    const daysInRelationship = Math.floor(timeDifference / (1000 * 3600 * 24))

                    return {
                        partnerName: partner.name,
                        daysInRelationship
                    }
                })
        })
}
