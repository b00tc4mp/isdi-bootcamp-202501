import { useEffect, useState } from 'react'

export function Landing({ onNavigateToRegister, onNavigateToLogin }) {
  const [divVisible, setDivVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setDivVisible(true), 100)
    return () => clearTimeout(timeout)
  }, [])

  const handleRegisterClick = () => onNavigateToRegister()
  const handleLoginClick = () => onNavigateToLogin()

  console.debug('Landing page renderized')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-6">
      <div className={`"bg-green-100/80 p-6 rounded-xl shadow-lg backdrop-blur-sm z-10 flex flex-col items-center transform transition-all duration-1000 ease-out
          ${divVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-75'}`}>
        <img
          src="/logo.png"
          alt="Little Breakfast logo"
          className="w-80 mb-4"
        />
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

