function Landing({ onRegisterClick, onLoginClick }) {
  console.debug("Landing -> render");

  return (
    <div className="landing-page">
      <div className="landing-page__icon">
        <h1 className="fa-solid fa-user-secret"></h1>
      </div>
      <div className="landing-page__content">
        <h1>Secret Stories</h1>
        <a className="landing-page__button" onClick={onRegisterClick}>Register</a>
        <span> or </span>
        <a className="landing-page__button" onClick={onLoginClick}>Login</a>
      </div>
    </div>
  );
}
export default Landing;
