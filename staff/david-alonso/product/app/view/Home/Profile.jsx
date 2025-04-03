import { useParams, useLocation } from "react-router"

import { Posts } from './Posts'

export const Profile = () => {
    const { username } = useParams()
    const { state: { userId } } = useLocation()

    return <div>
        <h1 className="user-profile">{username}</h1>

        <Posts key={userId || 'default'} targetUserId={userId} />
    </div>
}