export function Landing({ onRegisterClick, onLoginClick }) {
  console.debug("Landing -> render");

  const handleRegisterClick = () => {
    onRegisterClick();
  };

  const handleLoginClick = () => {
    onLoginClick();
  }

  return (
    <div className="landing-page">
      <div className="landing-page__icon">
        <h1 className="fa-solid fa-user-secret"></h1>
      </div>
      <div className="landing-page__content">
        <h1>Secret Stories</h1>
        <a className="landing-page__button" onClick={handleRegisterClick}>
          Register
        </a>
        <span> or </span>
        <a className="landing-page__button" onClick={handleLoginClick}>
          Login
        </a>
      </div>
    </div>
  );
}
