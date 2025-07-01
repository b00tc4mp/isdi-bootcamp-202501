import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router";
import { Landing } from "./view/Landing.js";
import { Register } from "./view/Register.js";
import { Login } from "./view/Login.js";
import { Home } from "./view/Home.js";

import { logic } from "./logic/logic.js";
function App() {
  const [view, setView] = useState("landing");
  const [loggedIn, setLoggedIn] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const loggedIn = logic.isUserLoggedIn();

      setLoggedIn(loggedIn);
    } catch (error) {
      console.error(error);

      alert(error.messsage);
    }
  }, []);

  useEffect(() => {
    switch (view) {
      case "landing":
        navigate("/landing");
        break;
      case "register":
        navigate("/register");
        break;
      case "login":
        navigate("/login");
        break;
      case "home":
        navigate("/");
        break;
      default:
        navigate("/landing");
    }
  }, [view]);
  const handleNavigateToRegister = () => setView("register");

  const handleNavigateToLogin = () => setView("login");

  const handleRegisterSubmit = () => setView("login");

  const handleLoginSubmit = () => {
    setLoggedIn(true);
    setView("home");
  };

  const handleLogoutClick = () => {
    setLoggedIn(false);
    setView("login");
  };

  console.debug("App -> render");

  return (
    <>
      {loggedIn !== null && (
        <Routes>
          {
            <Route
              path="/landing"
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
          }

          {
            <Route
              path="/register"
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
          }

          {
            <Route
              path="/login"
              element={
                loggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <Login
                    onRegisterClick={handleNavigateToRegister}
                    onLoginSubmit={handleLoginSubmit}
                  />
                )
              }
            />
          }

          {
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Home onLogoutClick={handleLogoutClick} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          }
        </Routes>
      )}
    </>
  );
}
export default App;
