import { useParams, useLocation } from 'react-router' //para cargar parametros

import { Posts } from './Posts'

export const Profile = () => {
    const { username } = useParams() //useParams te devuelve un objeto con parametros
    const { state: { userId } } = useLocation()
    
    return <div>
        <h1>{username}</h1>

        <Posts targetUserId={userId} />
    </div>
}