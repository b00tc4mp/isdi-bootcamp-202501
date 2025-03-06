const { useState, useEffect } = React;

import Landing from "./view/Landing.jsx";
import Register from "./view/Register.jsx";
import Login from "./view/Login.jsx";
import Home from "./view/Home.jsx";
import Header from "./view/Header.jsx";

import logic from "./logic.js";

function App() {
  const [view, setView] = useState("landing");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const isUserConnected = logic.isUserConnected();

    isUserConnected && setView("home");
  }, []);

  useEffect(() => {
    const isOnline = logic.isUserConnected();

    if (isOnline) {
      const user = logic.getOnlineUserName();

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

  return (
    <>
      <Header currentUser={currentUser} />
      {view === "landing" && (
        <Landing
          onRegisterNavigation={handleRegisterNavigation}
          onLoginNavigation={handleLoginNavigation}
        />
      )}
      {view === "register" && (
        <Register
          onLoginNavigation={handleLoginNavigation}
          onRegisterSuccess={handleRegisterNavigation}
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
