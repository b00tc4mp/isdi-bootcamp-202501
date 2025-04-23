import { logic } from '../../logic'
import { useContext } from '../../context'

export function Login({ onNavigateToRegister, onUserLoggedIn }) {
  const { alert } = useContext()
  const handleLoginSubmit = (event) => {
    event.preventDefault()

    try {
      const form = event.target
      const {
        username: { value: username },
        password: { value: password },
      } = form

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

  return (
    <>
      <div className='bg-pink-100 flex flex-col items-center justify-center'>
        <div className='w-full flex justify-center py-2'>
          <img className='w-32 h-auto' src='src/assets/asset_no_border_logo.png' alt='CoupleApp logo' />
        </div>
      </div>
      <div className='bg-pink-100 min-h-screen flex flex-col items-center py-4 px-4'>
        <div className='border-4 border-rose-300 bg-rose-100 p-8 rounded-3xl shadow-xl w-full max-w-md'>
          <form id='login-form' onSubmit={handleLoginSubmit} className='space-y-2'>
            <div>
              <label htmlFor='username' className='block text-lg font-medium text-gray-700'>
                Username
              </label>
              <input type='text' id='username' placeholder='username' className='mt-2 w-full px-4 py-2 rounded-lg border-2 bg-yellow-50 border-rose-300 focus:outline-none focus:ring-2 focus:ring-pink-300 autofill:shadow-[inset_0_0_0px_1000px_rgb(245,241,206)] shadow-sm' />
            </div>
            <div>
              <label htmlFor='password' className='block text-lg font-medium text-gray-700'>
                Password
              </label>
              <input type='password' id='password' placeholder='********' className='mt-2 w-full px-4 py-2 rounded-lg border-2 bg-yellow-50 border-rose-300 focus:outline-none focus:ring-2 focus:ring-pink-300 autofill:shadow-[inset_0_0_0px_1000px_rgb(245,241,206)] shadow-sm' />
            </div>
            <div className='flex flex-col justify-between items-center'>
              <a onClick={handleRegisterClick} className='text-pink-500 hover:underline text-sm pb-4'>
                I need a new account
              </a>
              <button type='submit' form='login-form' className='bg-pink-400 text-white py-2 px-6 rounded-lg hover:bg-pink-600 transition duration-200'>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
