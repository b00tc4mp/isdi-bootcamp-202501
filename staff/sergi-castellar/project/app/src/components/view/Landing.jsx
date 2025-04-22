export function Landing({ onNavigateToRegister, onNavigateToLogin }) {
  const handleRegisterClick = () => onNavigateToRegister()
  const handleLoginClick = () => onNavigateToLogin()

  return (
    <div className='flex items-center justify-center min-h-screen bg-pink-100'>
      <div className='flex flex-col items-center text-center w-full max-w-lg bg-white p-10 rounded-3xl shadow-lg space-y-8'>
        <img src='src/assets/asset_no_border_logo.png' alt='Couple App Logo' className='h-46 mb-4' />
        <h1 className='text-5xl font-bold text-pink-700'>Welcome to CoupleApp</h1>
        <div>
          <p className='text-xl font-semibold text-gray-800'>Start a love journey</p>
          <p className='text-xl font-semibold text-gray-800'>Grow together every day</p>
        </div>
        <div className='space-y-4 w-full'>
          <button onClick={handleLoginClick} className='w-full py-2 bg-pink-300 rounded-xl text-white font-bold text-xl hover:bg-pink-500'>
            Login
          </button>
          <button onClick={handleRegisterClick} className='w-full py-2 bg-pink-400 rounded-xl text-white font-bold text-xl hover:bg-pink-700'>
            Register
          </button>
        </div>
      </div>
    </div>
  )
}
