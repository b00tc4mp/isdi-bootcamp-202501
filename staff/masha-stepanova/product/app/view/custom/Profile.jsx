import { useParams, useLocation } from 'react-router'

import { Posts } from '../Home/components/Posts'

export const Profile = () => {
    const { username } = useParams()
    const { state: { userId } } = useLocation()

    return <div>
        <h1 class="username">{username}</h1>

        <Posts targetUserId={userId} />
    </div>
}