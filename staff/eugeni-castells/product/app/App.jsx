import { useEffect, useState } from "react";
import isUserConnected from "./logic/isUserConnected.js";
import getOnlineUserName from "./logic/getOnlineUserName.js";

import HamburgerMenu from "./view/Home/HamburgerMenu.jsx";
import Header from "./view/Home/Header.jsx";
import Home from "./view/Home/index.jsx";
import Landing from "./view/Landing.jsx";
import Login from "./view/Login.jsx";
import Register from "./view/Register.jsx";

function App() {
  const [view, setView] = useState("landing");
  const [currentUser, setCurrentUser] = useState(null);
  const [displayMenu, setDisplayMenu] = useState(false);

  useEffect(() => {
    const isUserLoggedIn = isUserConnected();

    isUserLoggedIn && setView("home");
  }, []);

  useEffect(() => {
    const isOnline = isUserConnected();

    if (isOnline) {
      const user = getOnlineUserName();

      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  }, [view]);

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
  const handleMenuDisplay = () => {
    setDisplayMenu(!displayMenu);
  };

  return (
    <>
      <Header currentUser={currentUser} onMenuDisplay={handleMenuDisplay} />

      {displayMenu && <HamburgerMenu />}
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
