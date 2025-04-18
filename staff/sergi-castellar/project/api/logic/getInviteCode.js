import { Couple, InviteCode } from '../data/index.js'
import { errors, validate } from 'com'
import { randomBytes } from 'crypto'

const { SystemError, NotSingleError } = errors

export const getInviteCode = (userId) => {
    validate.id(userId, 'userId')

    return Couple.findOne({ members: userId }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(couple => {
            if (couple) { throw new NotSingleError('User is already in couple') }

            return InviteCode.findOne({ createdBy: userId }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(existingCode => {
                    if (existingCode) return {
                        id: existingCode._id.toString(),
                        code: existingCode.code
                    }

                    const newCode = `COUPLE-${randomBytes(10).toString('hex')}`

                    return InviteCode.create({ code: newCode, createdBy: userId })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(inviteCode => {
                            return inviteCode.code
                        })
                })
        })
}
