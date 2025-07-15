import { Navigate } from 'react-router'
import { isUserLoggedIn } from '../logic/isUserLoggedIn'

export function RequireLogin({ children }) {
    return isUserLoggedIn() ? children : <Navigate to="/login" />
}