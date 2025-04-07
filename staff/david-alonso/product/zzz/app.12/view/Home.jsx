// HOME

const { useState, useEffect } = React

function Home({ onLogoutClick }) {

    // View se utiliza para actualizar el estado de la pagina
    const [view, setView] = useState('posts')

    // SetUserName guarda el nombre del usuario que este conectado
    const [userName, setUserName] = useState('')

    // **** TODO add state for posts

    // Actualiza el nombre de usuario cuando se conecta
    useEffect(() => {
        console.debug('Home -> useEffect')

        try {

            // Obtiene el numbre del usuario conectado
            const name = logic.getUserName()

            // Llamamos a la variable que contiene el nombre
            setUserName(name)

            // TODO load posts by means of logic
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    // Cierra la sesion y actualiza la pagina
    const handleLogoutClick = () => {
        try {
            logic.logoutUser()

            onLogoutClick()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    console.debug('home -> render')

    return <div>
        <h1>Home</h1>

        <h3>Hello, {userName}!</h3>

        <button type="button" onClick={handleLogoutClick}>Logout</button>

        <button type="button" onClick={() => { }}>➕</button>

        {view === 'posts' && <section>
            {/* TODO render post from state */}

            <article>
                <h3>dallen</h3>

                <img src="https://cdn2.yamaha-motor.eu/prod/product-assets/2025/YZ85LW/2025-Yamaha-YZ85LW-EU-Detail-001-03_Mobile.jpg" />

                <p>Yamaha YZ 85</p>

                <time>new Date(2024, 3, 2)</time>

            </article>


        </section>}

        {view === 'create-post' && <section>
            <form>
                <label>Image</label>
                <input type="url" />

                <label>Text</label>
                <input type="text" />

                <button type="submit">Create</button>
            </form>

            <a>Cancel</a>
        </section>}

        {view === 'post' && <button>➕</button>}
    </div >
}
