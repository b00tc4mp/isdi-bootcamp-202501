function Landing ({ onRegisterClick, onLoginClick }) {
    //const { onRegisterClick } = props desestructuro directamente en lo que paso como parametro
    console.debug('Landing -> render')
    return <div>
        <h1>Logo</h1>
        <div className="landingAnchors">
            <a onClick={onRegisterClick} className="anchorRegister">Register </a>
            <a onClick={onLoginClick} className="anchorLogin"> Login</a>
        </div>
    </div>
}