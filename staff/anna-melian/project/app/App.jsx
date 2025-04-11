import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router'

import { Landing } from './view/Landing.jsx'

function App() {
    const [showLanding, setShowLanding] = useState(true)
    const navigate = useNavigate()

    console.debug('App -> render')

    return <>
        <Routes>
            <Route path='/*'>
                <Landing />
            </Route>
        </Routes>



    </>
}