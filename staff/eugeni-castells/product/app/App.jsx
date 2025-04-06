import { useEffect, useState } from "react";
import { logic } from "./logic/index.js";
import Landing from "./view/Landing.jsx";
import Login from "./view/Login.jsx";
import Register from "./view/Register.jsx";
import Home from "./view/Home/index.jsx";
import { Route, useNavigate, Routes, Navigate } from "react-router";
import { Alert } from "./view/Alert.jsx";
import { Context } from "./context.js";

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [showLanding, setShowLanding] = useState(true);
  const [alertFeedback, setAlertFeedback] = useState(null);

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
    setShowLanding(false);
    navigate("/register");
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

  const handleAlertAccept = () => {
    setAlertFeedback("");
  };

  const handleShowAlert = (message) => {
    setAlertFeedback(message);
  };
  console.log("render App");

  return (
    <Context value={{ alert: handleShowAlert }}>
      <>
        {loggedIn !== null && (
          <>
            <Routes>
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
                  ) : showLanding ? (
                    <Landing
                      onRegisterNavigation={handleRegisterNavigation}
                      onLoginNavigation={handleLoginNavigation}
                    />
                  ) : (
                    <Navigate to={"/login"} />
                  )
                }
              />
            </Routes>
            {alertFeedback && (
              <Alert
                title={"⚠️"}
                message={alertFeedback}
                onAccepted={handleAlertAccept}
              />
            )}
          </>
        )}
      </>
    </Context>
  );
}

export default App;
