export function Landing({ onNavigateToRegister, onNavigateToLogin }) {
    const handleRegisterClick = () => onNavigateToRegister()

    const handleLoginClick = () => onNavigateToLogin()

    console.debug('Landing -> render')
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white text-fuchsia-900 px-4">
            <h1 className="text-5xl font-extrabold mb-16 drop-shadow-sm tracking-wide title"> TimeArt </h1>

            <div className="flex flex-col items-center space-y-5">
                <button
                    onClick={handleLoginClick}
                    className=" hover:bg-fuchsia-800 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105"
                >
                    Login
                </button>


                <button
                    onClick={handleRegisterClick}
                    className=" hover:bg-fuchsia-800 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105"
                >
                    Register
                </button>
            </div>
        </div>
    );

}