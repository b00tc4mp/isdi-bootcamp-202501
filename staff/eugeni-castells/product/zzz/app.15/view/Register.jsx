import { logic } from "../logic";

function Register({ onLoginNavigation, onRegisterSuccess }) {
  const handleRegisterSUbmit = (event) => {
    event.preventDefault();

    try {
      const { target: form } = event;

      const {
        name: { value: name },
        email: { value: email },
        username: { value: username },
        password: { value: password },
      } = form;

      logic
        .registerUser({
          name,
          email,
          username,
          password,
        })
        .then(() => {
          form.reset();

          handleRegisterSuccess();
        })
        .catch((error) => {
          console.error;

          alert(error.message);
        });
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  const handleLoginNavigation = () => onLoginNavigation();

  const handleRegisterSuccess = () => onRegisterSuccess();

  return (
    <>
      <div style={{ height: "100vh", padding: "2rem" }}>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          onSubmit={handleRegisterSUbmit}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label htmlFor="email">E-mail</label>
            <input type="text" id="email" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              type="button"
              style={{ width: "auto", padding: "5px" }}
              onClick={handleLoginNavigation}
            >
              Login
            </button>
            <button
              style={{
                width: "65px",
                backgroundColor: "black",
                color: "white",
                padding: "5px",
              }}
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
