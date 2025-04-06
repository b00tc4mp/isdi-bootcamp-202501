import { useParams, useLocation } from 'react-router'

import { Posts } from './Posts'

export const Profile = () => {
    const { username } = useParams()
    const { state: { userId } } = useLocation()

    return (
        <div className="text-center py-8">
            <h1 className="text-3xl font-bold">{username}</h1>
            <Posts targetUserId={userId} />
        </div>
    )
}
