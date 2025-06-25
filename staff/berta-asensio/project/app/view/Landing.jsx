export function Landing({ onNavigateToRegister, onNavigateToLogin }) {
  const handleRegisterClick = () => onNavigateToRegister()
  const handleLoginClick = () => onNavigateToLogin()

  console.debug('Landing page renderized')

  return (
    <div
      className="min-h-screen bg-green-100 flex flex-col items-center justify-center p-6 bg-no-repeat bg-contain bg-center"
      style={{ backgroundImage: "url('/logo-transparent.png')",
               backgroundSize: "300px"
      }}
    >
      <div className="bg-green-100/80 p-6 rounded-xl shadow-lg backdrop-blur-sm z-10 flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-8 text-green-900">
          Little Breakfast
        </h1>

        <button
          onClick={handleRegisterClick}
          className="w-48 mb-4 py-2 bg-green-300 hover:bg-green-400 text-green-900 font-semibold rounded-md transition"
        >
          Register
        </button>

        <span className="block mb-4 text-green-900">or</span>

        <button
          onClick={handleLoginClick}
          className="w-48 py-2 bg-green-300 hover:bg-green-400 text-green-900 font-semibold rounded-md transition"
        >
          Login
        </button>
      </div>
    </div>
  )
}

