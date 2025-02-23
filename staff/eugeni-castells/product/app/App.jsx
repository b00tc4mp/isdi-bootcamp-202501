data.users = JSON.parse(localStorage.getItem("users"));
data.posts = JSON.parse(localStorage.getItem("posts"));

function App() {
  const { useState } = React;

  const [view, setView] = useState("landing");

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
          onRegisterClick={handleRegisterClick}
          onLoginSuccess={handleHomeClick}
        />
      )}
    </>
  );
}
