function Landing({ onRegisterNavigation, onLoginNavigation }) {
  const handleRegisterClick = () => onRegisterNavigation();

  const handleLoginClick = () => onLoginNavigation();

  return (
    <div className="screen-container">
      <div>
        <a
          style={{
            textDecoration: "underline",
            color: "black",
            fontSize: "30px",
          }}
          onClick={handleRegisterClick}
        >
          Register
        </a>
        <span style={{ color: "black", fontSize: "26px" }}> or </span>
        <a
          style={{
            textDecoration: "underline",
            color: "black",
            fontSize: "30px",
          }}
          onClick={handleLoginClick}
        >
          Login
        </a>
      </div>
    </div>
  );
}

export default Landing;
