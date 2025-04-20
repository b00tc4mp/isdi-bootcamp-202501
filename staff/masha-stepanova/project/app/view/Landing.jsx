export function Landing({ onNavigateToRegister, onNavigateToLogin }) {
  const handleRegisterClick = () => onNavigateToRegister()
  const handleLoginClick = () => onNavigateToLogin()

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-periwinkle to-mauve px-6 py-10 text-center font-sans'>
      <img src='../public/Logo.png' alt='Code Quest logo' className='h-30 w-auto' />
      <h1 className='text-4xl sm:text-5xl font-extrabold text-purple-900 drop-shadow-md mb-4'>Welcome to Code Quest!</h1>

      <p className='text-lg sm:text-xl text-purple-700 mb-8'>Learn JavaScript by playing through magical levels</p>

      <div>
        <button onClick={handleLoginClick} className='bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition w-50 mb-2'>
          Iniciar sesión
        </button>
        <button onClick={handleRegisterClick} className='bg-white text-purple-700 border border-purple-400 hover:bg-purple-50 font-semibold py-2 px-6 rounded-full shadow-md transition w-50'>
          Regístrate
        </button>
      </div>

      {/* <div className='mt-12 text-sm text-purple-800 opacity-70'>¡Explora el Bosque de las Variables, la Montaña de las Funciones y más!</div> */}
    </div>
  )
}
