function Landing({ onRegisterClick, onLoginClick }) {
  console.debug('Landing -> render')

  return <div>
      <h1>Logo</h1>
      <p>Welcome</p>
      <a onClick={onRegisterClick}>Register</a> or <a onClick={onLoginClick}>Login</a>
  </div>
}
