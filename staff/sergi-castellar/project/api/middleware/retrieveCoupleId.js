import { Couple } from '../models'

function retrieveCoupleId(req, res, next) {
    try {
        const userId = req.userId

        Couple.findOne({ members: userId })
            .select('_id')
            .then(couple => {
                if (!couple)
                    return res.status(404).json({ error: 'Couple not found' })

                req.coupleId = couple._id
                next()
            })
            .catch(error => {
                console.error('Error retrieving coupleId:', error)
                res.status(500).json({ error: 'Internal server error' })
            })
    } catch (error) {
        next(error)
    }

}

export default retrieveCoupleId
