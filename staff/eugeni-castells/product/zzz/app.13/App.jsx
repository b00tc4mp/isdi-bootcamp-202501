// import { useState, useEffect } from "react";
const { useState, useEffect } = React;

import Landing from "./view/Landing.jsx";
import Register from "./view/Register.jsx";
import Login from "./view/Login.jsx";
import Home from "./view/Home.jsx";

import logic from "./logic.js";

function App() {
  const [view, setView] = useState("landing");

  useEffect(() => {
    const isUserConnected = logic.isUserConnected();

    isUserConnected && setView("home");
  }, []);
  const handleRegisterClick = () => {
    setView("register");
  };

  const handleLoginClick = () => {
    setView("login");
  };

  const handleHomeClick = () => {
    setView("home");
  };

  return (
    <>
      {view === "landing" && (
        <Landing
          onRegisterClick={handleRegisterClick}
          onLoginClick={handleLoginClick}
        />
      )}
      {view === "register" && (
        <Register
          onLoginClick={handleLoginClick}
          onRegisterSuccess={handleLoginClick}
        />
      )}
      {view === "login" && (
        <Login
          onRegisterClick={handleRegisterClick}
          onLoginSuccess={handleHomeClick}
        />
      )}
      {view === "home" && (
        <Home
          onLogoutClick={handleLoginClick}
          onCancelClick={handleHomeClick}
        />
      )}
    </>
  );
}

export default App;
