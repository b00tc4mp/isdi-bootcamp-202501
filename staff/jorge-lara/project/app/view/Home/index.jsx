import { useEffect, useState } from "react";
import { logic } from "../../logic/index.js";
import { Routes, Route, useNavigate, NavLink } from "react-router";

import { Exercises } from '../Exercises.jsx';
import { Dashboard } from './Dashboard.jsx';
import { Routines } from "../Routines.jsx";

export function Home({ onUserLoggedOut }) {
    const [username, setUsername] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        try {
            logic.getUserUsername()
                .then(username => setUsername(username))
                .catch(error => {
                    console.error(error);

                    //TODO alerts
                })
        } catch (error) {
            console.error(error);
        }
    }, [])

    const handleLogoutClick = () => {
        //TODO confirm context
        try {
            logic.logoutUser();

            onUserLoggedOut();
        } catch (error) {
            console.error(message);
        }
    }

    return <div className="min-h-screen flex flex-col">
        <header className="relative bg-gray-100 shadow">
            <div className="flex items-center justify-between px-6 py-4">
                <div>
                    <img src="assets/logo.svg" className="w-12 h-12" />
                </div>
                <nav className="flex-1 flex justify-center space-x-8">

                    <NavLink to="/" className={({ isActive }) => `text-gray-700 hover:text-orange-500 ${isActive ? 'text-orange-500 font-semibold' : ''}`}>
                        Dashboard
                    </NavLink>


                    <NavLink to="/exercises" className={({ isActive }) => `text-gray-700 hover:text-orange-500 ${isActive ? 'text-orange-500 font-semibold' : ''}`}>
                        Exercises
                    </NavLink>


                    <NavLink to="/routines" className={({ isActive }) => `text-gray-700 hover:text-orange-500 ${isActive ? 'text-orange-500 font-semibold' : ''}`}>
                        Routines
                    </NavLink>

                </nav>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-700 font-medium">{username}</span>
                    <button onClick={handleLogoutClick} className="cursor-pointer px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">Logout</button>
                </div>
            </div>

        </header>
        <main>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/exercises" element={<Exercises />} />
                <Route path="/routines" element={<Routines />} />
            </Routes>
        </main>
    </div>
}