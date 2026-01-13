import { useParams, useLocation } from "react-router"
import { Logo } from "./Logo"

import { PostList } from './PostList'

//import './Profile.css'

export const Profile = () => {
    const {username} = useParams()
    const { state: { userId } } = useLocation()

    return <div>
        <h1 class="username">{username}</h1>
        <PostList targetUserId={userId} />
    </div>
}