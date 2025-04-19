import { logic } from '../logic'

export function Register({ onNavigateToLogin, onUserRegistered }) {
  const handleRegisterSubmit = (event) => {
    event.preventDefault()

    try {
      const form = event.target
      const {
        name: { value: name },
        email: { value: email },
        username: { value: username },
        password: { value: password },
        password2: { value: password2 },
      } = form

      logic
        .registerUser(name, email, username, password, password2)
        .then(() => {
          form.reset()

          alert('user created')

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

  const handleLoginClick = () => onNavigateToLogin()

  return (
    <>
      <div className='bg-pink-100 flex flex-col items-center justify-center'>
        <div className='w-full flex justify-center py-2'>
          <img className='w-32 h-auto' src='../assets/asset_no_border_logo.png' alt='CoupleApp logo' />
        </div>
      </div>
      <div className='bg-pink-100 min-h-screen flex flex-col items-center py-4 px-4'>
        <div className='border-4 border-rose-300 bg-rose-100 p-8 rounded-3xl shadow-xl w-full max-w-md'>
          <form id='register-form' onSubmit={handleRegisterSubmit} className='space-y-2'>
            <div>
              <label htmlFor='name' className='block text-lg font-medium text-gray-700'>
                Name
              </label>
              <input type='text' id='name' placeholder='Name' className='mt-1 w-full px-4 py-2 rounded-lg border-2 bg-yellow-50 border-rose-300 focus:outline-none focus:ring-2 focus:ring-pink-300 autofill:shadow-[inset_0_0_0px_1000px_rgb(245,241,206)] shadow-sm' />
            </div>
            <div>
              <label htmlFor='username' className='block text-lg font-medium text-gray-700'>
                Username
              </label>
              <input type='text' id='username' placeholder='Username' className='mt-1 w-full px-4 py-2 rounded-lg border-2 bg-yellow-50 border-rose-300 focus:outline-none focus:ring-2 focus:ring-pink-300 autofill:shadow-[inset_0_0_0px_1000px_rgb(245,241,206)] shadow-sm' />
            </div>
            <div>
              <label htmlFor='email' className='block text-lg font-medium text-gray-700'>
                Email
              </label>
              <input type='email' id='email' placeholder='Email' className='mt-1 w-full px-4 py-2 rounded-lg border-2 bg-yellow-50 border-rose-300 focus:outline-none focus:ring-2 focus:ring-pink-300 autofill:shadow-[inset_0_0_0px_1000px_rgb(245,241,206)] shadow-sm' />
            </div>
            <div>
              <label htmlFor='password' className='block text-lg font-medium text-gray-700'>
                Password
              </label>
              <input type='password' id='password' placeholder='********' className='mt-1 w-full px-4 py-2 rounded-lg border-2 bg-yellow-50 border-rose-300 focus:outline-none focus:ring-2 focus:ring-pink-300 autofill:shadow-[inset_0_0_0px_1000px_rgb(245,241,206)] shadow-sm' />
            </div>
            <div>
              <label htmlFor='password2' className='block text-lg font-medium text-gray-700'>
                Confirm Password
              </label>
              <input type='password' id='password2' placeholder='********' className='mt-1 w-full px-4 py-2 rounded-lg border-2 bg-yellow-50 border-rose-300 focus:outline-none focus:ring-2 focus:ring-pink-300 autofill:shadow-[inset_0_0_0px_1000px_rgb(245,241,206)] shadow-sm' />
            </div>
            <div className='flex flex-col justify-between items-center'>
              <a onClick={handleLoginClick} className='text-pink-500 hover:underline text-sm pb-4'>
                I already have an account
              </a>
              <button type='submit' form='register-form' className='bg-pink-500 text-white py-2 px-6 rounded-lg hover:bg-pink-600 transition duration-200'>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
