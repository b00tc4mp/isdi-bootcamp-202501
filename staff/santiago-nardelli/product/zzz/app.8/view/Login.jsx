 import logic from '../logic/logic.js';
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
    <div className="landing-page">
      <div className="landing-page__icon">
        <h1 className="fa-solid fa-user-secret"></h1>
      </div>
      <form className="form-container" onSubmit={handleLoginSubmit}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <a className='landing-page__button' onClick={onRegisterClick}>Register</a>
    </div>
  );
}
export default Login;