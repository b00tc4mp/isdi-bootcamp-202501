import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router";
import { Landing } from "./view/Landing.jsx";
import { Register } from "./view/Register.jsx";
import { Login } from "./view/Login.jsx";
import { Home } from "./view/Home.jsx";

import { logic } from "./logic/logic.js";
function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [showLanding, setShowLanding] = useState(true);

  const navigate = useNavigate();

  // Centralizar las rutas
  const ROUTES = {
    LANDING: "/landing",
    REGISTER: "/register",
    LOGIN: "/login",
    HOME: "/",
  };

  useEffect(() => {
    try {
      const loggedIn = logic.isUserLoggedIn();

      setLoggedIn(loggedIn);

    } catch (error) {
      console.error(error);

      alert(error.messsage);
    }
  }, []);

  const handleNavigateToRegister = () => {
    setShowLanding(false);
    navigate(ROUTES.REGISTER);
  };

  const handleNavigateToLogin = () => {
    setShowLanding(false);
    navigate(ROUTES.LOGIN);
  };

  const handleRegisterSubmit = () => {
    setShowLanding(false);
    navigate(ROUTES.LOGIN);
  };

  const handleUserLoggedIn = () => {
    setShowLanding(false);
    setLoggedIn(true);
    navigate(ROUTES.HOME);
  };

  const handleUserLoggedOut = () => {
    setShowLanding(false);
    setLoggedIn(false);
    navigate(ROUTES.LOGIN);
  };

  console.debug("App -> render");

  return (
    <>
      {loggedIn !== null && 
        <Routes>
          <Route
            path={ROUTES.LANDING}
            element={
              loggedIn ? (
                <Navigate to="/" />
              ) : (
                <Landing
                  onRegisterClick={handleNavigateToRegister}
                  onLoginClick={handleNavigateToLogin}
                />
              )
            }
          />

          <Route
            path={ROUTES.REGISTER}
            element={
              loggedIn ? (
                <Navigate to="/" />
              ) : (
                <Register
                  onLoginClick={handleNavigateToLogin}
                  onRegisterSubmit={handleRegisterSubmit}
                />
              )
            }
          />

          <Route
            path={ROUTES.LOGIN}
            element={
              loggedIn ? (
                <Navigate to={ROUTES.HOME} />
              ) : (
                <Login
                  onRegisterClick={handleNavigateToRegister}
                  onLoginSubmit={handleUserLoggedIn}
                />
              )
            }
          />

          <Route
            path="/*"
            element={
              loggedIn ? (
                <Home onLogoutClick={handleUserLoggedOut} />
              ) : (
                <Navigate to={`${showLanding ? ROUTES.LANDING : ROUTES.LOGIN}`} />
              )
            }
          />
        </Routes>
      }
    </>
  );
}
export default App;
