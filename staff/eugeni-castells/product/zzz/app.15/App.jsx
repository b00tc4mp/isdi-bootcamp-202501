import { useEffect, useState } from "react";
import isUserConnected from "./logic/isUserConnected.js";
import Home from "./view/Home/index.jsx";
import Landing from "./view/Landing.jsx";
import Login from "./view/Login.jsx";
import Register from "./view/Register.jsx";

function App() {
  const [view, setView] = useState("landing");

  useEffect(() => {
    const isUserLoggedIn = isUserConnected();

    isUserLoggedIn && setView("home");
  }, []);

  const handleRegisterNavigation = () => {
    setView("register");
  };

  const handleLoginNavigation = () => {
    setView("login");
  };

  const handleLoginSuccess = () => {
    setView("home");
  };

  const handleLogoutSuccess = () => {
    setView("login");
  };

  const handleRegisterSuccess = () => {
    setView("login");
  };

  return (
    <>
      {view === "landing" && (
        <Landing
          onRegisterNavigation={handleRegisterNavigation}
          onLoginNavigation={handleLoginNavigation}
        />
      )}
      {view === "register" && (
        <Register
          onLoginNavigation={handleLoginNavigation}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}
      {view === "login" && (
        <Login
          onRegisterNavigation={handleRegisterNavigation}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {view === "home" && <Home onLogoutSuccess={handleLogoutSuccess} />}
    </>
  );
}

export default App;
