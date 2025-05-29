function Login({ onRegisterClick, onLoginSubmit }) {
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    try {
      const { target: form } = e;

      const {
        email: { value: email },
        password: { value: password },
      } = form;

      logic.loginUser(email, password);

      form.reset();

      onLoginSubmit();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  console.debug("Login -> render");

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <p>or</p>
      <a onClick={onRegisterClick}>Register</a>
    </div>
  );
}
