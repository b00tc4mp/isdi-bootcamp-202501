export function Profile({ onHomeClick }) {
    // const user = index.getCurrentUser()

    const handleHomeClick = () => {
        try {
            onHomeClick()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return < div className="profile">
        <h1>Profile</h1>

        <img className="profPic" src="https://media.licdn.com/dms/image/v2/C4D03AQEirCF7fh9eeA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1659545777658?e=2147483647&v=beta&t=0Ms4MF7eaPWjy0mECePNvIASagZ7CM47zkMm2qgXbro" />

        <form>
            <div className="field">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Type name..." />
            </div>

            <div className="field">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" placeholder="Type email..." />
            </div>

            <div className="field">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Type username..." />
            </div>

            <div className="field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Type password..." />
            </div>

            <span style={{ justifyContent: "space-between" }}>
                <a onClick={handleHomeClick}>Home</a>
                <button type="submit">Change</button>
            </span>
        </form>
    </div>
}