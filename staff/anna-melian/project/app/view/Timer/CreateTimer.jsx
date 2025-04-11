import { logic } from '../../logic/index.js'
export function CreateTimer({ onUserLoggedOut }) {

    const handleLogoutClick = () => {
        const accepted = confirm('Logout?')
        if (accepted) {
            logic.logoutUser()

            onUserLoggedOut()
        } else {
            console.error(error)

            alert(error.message)
        }
    }


    console.debug('CreateTimer -> render')

    return <div>
        <header>
            <h2>☰</h2>
            <h1>Timer</h1>
            <div>
                <p>00</p>
                <p>GEM</p>
            </div>
            <button type="button" onClick={handleLogoutClick}>Logout</button>
        </header>

        <main>
            <h3>Create a timer</h3>
            <h1>00:00</h1>
            <div>cuadro</div>
            <div>
                <h2>Pause</h2> <input type="number" id="pause" /> <p>min</p>
            </div>
            <button>Start</button>
        </main>
    </div>

}