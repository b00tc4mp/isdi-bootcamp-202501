import { useState } from 'react'
import { useNavigate } from 'react-router'
import { logic } from '../logic'

export function SetDateStart() {
  const [date, setDate] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    try {
      logic
        .setCoupleStartDate(date)
        .then(() => {
          navigate('/home')
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

  return (
    <div className='min-h-screen bg-pink-100 flex items-start justify-center p-6'>
      <div className='bg-white rounded-3xl p-6 w-full max-w-md shadow-xl text-center space-y-4'>
        <h2 className='text-xl font-bold'>Set the day your love story began 💖</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input type='date' className='border rounded-xl px-3 py-2 w-full' value={date} onChange={(event) => setDate(event.target.value)} required />
          <button type='submit' className='bg-pink-500 text-white px-4 py-2 rounded-xl w-full'>
            Save Date
          </button>
        </form>
      </div>
    </div>
  )
}
