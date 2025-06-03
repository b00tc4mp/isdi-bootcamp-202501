import { useContext } from '../context'
import { logic } from '../logic'

export function Login({ onUserLoggedIn, onNavigateToRegister }) {
  const { alert } = useContext()

  const handleLoginSubmit = (event) => {
    event.preventDefault()
    try {
      const form = event.target
      const username = form.username.value
      const password = form.password.value

      logic
        .loginUser(username, password)
        .then(() => {
          form.reset()
          onUserLoggedIn()
        })
        .catch((error) => {
          console.error(error)

          alert(error.message)
        })
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }

  const handleRegisterClick = () => onNavigateToRegister()

  console.debug('Login -> render')

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#CCCCFF] to-[#E0B0FF] p-6'>
      <img src='../public/Logo.png' alt='Code Quest logo' className='h-20 w-auto mb-2' />
      <h1 className='text-4xl font-extrabold text-purple-900 mb-8 drop-shadow-md'>Login</h1>

      <form onSubmit={handleLoginSubmit} className='bg-white/75 p-6 rounded-xl shadow-lg w-full max-w-sm space-y-4'>
        <div className='text-left'>
          <label htmlFor='username' className='block text-purple-800 font-semibold'>
            Username
          </label>
          <input id='username' type='text' className='w-full mt-1 p-1 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-mauve' />
        </div>

        <div className='text-left'>
          <label htmlFor='password' className='block text-purple-800 font-semibold'>
            Password
          </label>
          <input id='password' type='password' className='w-full mt-1 p-1 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-mauve' />
        </div>

        <button type='submit' className='w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition'>
          Log in
        </button>
      </form>

      <p className='mt-4 text-purple-700 text-sm'>
        Don't have an account yet?{' '}
        <button onClick={handleRegisterClick} className='underline hover:text-purple-900'>
          Register
        </button>
      </p>
    </div>
  )
}
