import { useContext } from '../context'

import { logic } from '../logic'

export const Register = ({ onUserRegistered, onNavigateToLogin }) => {
  const { alert } = useContext()

  const handleLoginClick = () => onNavigateToLogin()

  const handleRegisterSubmit = (event) => {
    event.preventDefault()
    try {
      const form = event.target
      const name = form.name.value
      const email = form.email.value
      const username = form.username.value
      const password = form.password.value
      const repeatedPassword = form.repeatedPassword.value

      logic
        .registerUser(name, email, username, password, repeatedPassword)
        .then(() => {
          form.reset()
          onUserRegistered()
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

  console.debug('Register -> render')

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#CCCCFF] to-[#E0B0FF] p-6'>
      <img src='../public/Logo.png' alt='Code Quest logo' className='h-20 w-auto mb-2' />

      <h1 className='text-4xl font-extrabold text-purple-900 mb-8 drop-shadow-md'>Register</h1>

      <form onSubmit={handleRegisterSubmit} className='bg-white/75 p-6 rounded-xl shadow-lg w-full max-w-sm space-y-4'>
        {[
          { label: 'Name', id: 'name' },
          { label: 'Email', id: 'email' },
          { label: 'Username', id: 'username' },
          { label: 'Password', id: 'password', type: 'password' },
          { label: 'Repeat password', id: 'repeatedPassword', type: 'password' },
        ].map(({ label, id, type = 'text' }) => (
          <div className='text-left' key={id}>
            <label htmlFor={id} className='block text-purple-800 font-semibold'>
              {label}
            </label>
            <input id={id} type={type} className='w-full mt-1 p-1 rounded-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-periwinkle' />
          </div>
        ))}

        <button type='submit' className='w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition'>
          Register
        </button>
      </form>

      <p className='mt-4 text-purple-700 text-sm'>
        Already have an account?{' '}
        <button onClick={handleLoginClick} className='underline hover:text-purple-900'>
          Login
        </button>
      </p>
    </div>
  )
}
