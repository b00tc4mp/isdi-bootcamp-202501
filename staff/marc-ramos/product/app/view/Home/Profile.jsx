import { useParams, useLocation } from 'react-router'

import { Posts } from './Posts'

export const Profile = () => {
    const { username } = useParams()
    const { state: { userId } } = useLocation()

    return <div>
        <h1 className="username">{username}</h1>

        <Posts targetUserId={userId} />
    </div>
}