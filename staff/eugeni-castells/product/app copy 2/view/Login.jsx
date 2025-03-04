// import { useEffect } from "react";
import logic from "../logic";

function Login({ onRegisterClick, onLoginSuccess }) {
  const handleLoginSubmit = (event) => {
    event.preventDefault();

    try {
      const {
        username: { value: username },
        password: { value: password },
      } = event.target.elements;

      logic.loginUser(username, password);

      onLoginSuccess();
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };
  console.log("Login -> render");
  return (
    <div style={{ height: "100vh", padding: "2rem" }}>
      <h1>Logo</h1>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        onSubmit={handleLoginSubmit}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button type="button" onClick={onRegisterClick}>
            Register
          </button>
          <button
            type="submit"
            style={{
              width: "65px",
              backgroundColor: "black",
              color: "white",
              padding: "5px",
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
