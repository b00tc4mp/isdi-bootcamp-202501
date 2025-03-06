function Landing({ onRegisterClick, onLoginClick }) {
  return (
    <div style={{ height: "100vh", padding: "2rem" }}>
      <div>
        <a
          style={{
            textDecoration: "underline",
            color: "black",
            fontSize: "30px",
          }}
          onClick={onRegisterClick}
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
          onClick={onLoginClick}
        >
          Login
        </a>
      </div>
    </div>
  );
}

export default Landing;
