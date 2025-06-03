const root = ReactDOM.createRoot(document.getElementById('root'))

const handleRegisterClick = function () {
    root.render(<Register
        onLoginClick={handleLoginClick}
        onRegisterSubmit={handleRegisterSubmit}
    />)
}

const handleLoginClick = function () {
    root.render(<Login
        onRegisterClick={handleRegisterClick}
        onLoginSubmit={handleLoginSubmit}
    />)
}

const handleLoginSubmit = function (event) {
    event.preventDefault()

    root.render(<Home
        onLikeButoonClick={LikePost}
    />)
}

const handleRegisterSubmit = function (event) {
    event.preventDefault()

    root.render(<Login
        onRegisterClick={handleRegisterClick}
        onLoginSubmit={handleLoginSubmit}
    />)
}

function LikePost() {
    const [liked, setLiked] = useState('🤍')

    const handlelikeButtonClick = function () {
        setLiked('❤️')
    }

    return handlelikeButtonClick
}


root.render(<Landing
    onRegisterClick={handleRegisterClick}
    onLoginClick={handleLoginClick}
/>)
//root.render(<Register />)
//root.render(<Login />)
//root.render(<Home />)
//root.render(<AddPost />)