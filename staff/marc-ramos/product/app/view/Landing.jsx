function Landing({ onRegisterClick, onLoginClick }) {
    console.debug('Landing -> render')

    return <div className="landing">
        <img src=""/>
        <h1>Deepstagram</h1>
        <h4>¡Meet people, share contents, rate posts and more!</h4>
        <a onClick={onRegisterClick}>Register</a> or <a onClick={onLoginClick}>Login</a>
    </div>
}

export default Landing