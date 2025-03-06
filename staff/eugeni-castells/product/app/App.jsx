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

  const handleLogoutClick = () => {
    setView("login");
  };

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
      <Header currentUser={currentUser} />
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
