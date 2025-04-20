import { Couple, InviteCode } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, NotFoundError, NotAllowedError, NotSingleError } = errors

export const joinWithInviteCode = (userId, inviteCode) => {
    validate.id(userId, 'userId')
    validate.inviteCode(inviteCode, 'inviteCode')

    return InviteCode.findOne({ code: inviteCode }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(dbInviteCode => {
            console.log('dbInviteCode :>> ', dbInviteCode);
            if (!dbInviteCode) throw new NotFoundError('Invite code not found')
            if (dbInviteCode.createdBy.toString() === userId)
                throw new NotAllowedError('Cannot use your own code')

            return Promise.all([
                Couple.findOne({ members: userId }).lean(),
                Couple.findOne({ members: dbInviteCode.createdBy }).lean()
            ])
                .catch(error => { throw new SystemError(error.message) })
                .then(([userCouple, creatorCouple]) => {
                    if (userCouple)
                        throw new NotSingleError('You are already in a couple')

                    if (creatorCouple)
                        throw new NotSingleError('The invite code creator is already in a couple')

                    return Couple.create({ members: [dbInviteCode.createdBy, userId] })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(couple => {
                            const [user1Id, user2Id] = couple.members

                            return InviteCode.deleteMany({ createdBy: { $in: [user1Id, user2Id] } })
                                .catch(error => { throw new SystemError(error.message) })
                                .then(() => {
                                    return {
                                        coupleId: couple._id.toString(),
                                        members: couple.members.map(id => id.toString())
                                    }
                                })
                        })
                })
        })
}
