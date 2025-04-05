import { useEffect, useState } from "react";
import { logic } from "./logic/index.js";
import Landing from "./view/Landing.jsx";
import Login from "./view/Login.jsx";
import Register from "./view/Register.jsx";
import Home from "./view/Home/index.jsx";
import { Route, useNavigate, Routes, Navigate } from "react-router";

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [showLanding, setShowLanding] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const loggedIn = logic.isUserLoggedIn;

      setLoggedIn(loggedIn);
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  }, []);

  const handleRegisterNavigation = () => {
    navigate("/register");
    setShowLanding(false);
  };

  const handleLoginNavigation = () => {
    navigate("/login");
    setShowLanding(false);
  };

  const handleLoginSuccess = () => {
    navigate("/");
    setLoggedIn(true);
    setShowLanding(false);
  };

  const handleLogoutSuccess = () => {
    navigate("/login");
    setLoggedIn(false);
    setShowLanding(false);
  };

  const handleRegisterSuccess = () => {
    navigate("/login");
    setShowLanding(false);
  };

  console.log("render App");

  return (
    <>
      {loggedIn !== null && (
        <Routes>
          <Route
            path="/landing"
            element={
              loggedIn ? (
                <Navigate to="/" />
              ) : (
                <Landing
                  onRegisterNavigation={handleRegisterNavigation}
                  onLoginNavigation={handleLoginNavigation}
                />
              )
            }
          />
          <Route
            path="/register"
            element={
              loggedIn ? (
                <Navigate to="/" />
              ) : (
                <Register
                  onLoginNavigation={handleLoginNavigation}
                  onRegisterSuccess={handleRegisterSuccess}
                />
              )
            }
          />
          <Route
            path="/login"
            element={
              loggedIn ? (
                <Navigate to="/" />
              ) : (
                <Login
                  onRegisterNavigation={handleRegisterNavigation}
                  onLoginSuccess={handleLoginSuccess}
                />
              )
            }
          />
          <Route
            path="/*"
            element={
              loggedIn ? (
                <Home onLogoutSuccess={handleLogoutSuccess} />
              ) : (
                <Navigate to={showLanding ? "/landing" : "/login"} />
              )
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
