function App() {
  const { useState, useEffect } = React;

  const [view, setView] = useState("landing");

  useEffect(() => {
    const isUserConnected = logic.isUserConnected();

    isUserConnected ? setView("home") : setView("landing");
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
