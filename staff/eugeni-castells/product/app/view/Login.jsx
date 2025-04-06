import { logic } from "../logic";
import { useContext } from "../context";

function Login({ onRegisterNavigation, onLoginSuccess }) {
  const { alert } = useContext();

  const handleLoginSuccess = () => {
    onLoginSuccess();
  };

  const handleRegisterClick = () => {
    onRegisterNavigation();
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    try {
      const { target: form } = event;

      const {
        username: { value: username },
        password: { value: password },
      } = form;

      logic
        .authenticateUser(username, password)
        .then(() => {
          form.reset();

          handleLoginSuccess();
        })
        .catch((error) => {
          console.error(error);

          alert(error.message);
        });
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  console.log("Login -> render");

  return (
    <div className="screen-container">
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
          <button type="button" onClick={handleRegisterClick}>
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
