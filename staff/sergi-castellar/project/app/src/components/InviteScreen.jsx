import { useState } from 'react'
import { useNavigate } from 'react-router'
import { logic } from '../logic'
import { useContext } from '../context'

export function InviteScreen() {
  const { alert } = useContext()
  const [code, setCode] = useState('')
  const [generatedCode, setGeneratedCode] = useState(null)
  const [copied, setCopied] = useState(false)

  const navigate = useNavigate()

  const handleGenerateInviteCode = () => {
    logic
      .generateInviteCode()
      .then((code) => {
        setGeneratedCode(code)
      })
      .catch((error) => {
        console.error(error)

        alert(error.message)
      })
  }

  const handleSubmitCode = () => {
    logic
      .joinWithInviteCode(code)
      .then(() => {
        navigate('/home')
      })
      .catch((error) => {
        console.error(error)

        alert(error.message)
      })
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className='min-h-screen bg-pink-100 flex items-start justify-center p-6'>
      <div className='bg-white rounded-3xl p-6 w-full max-w-md shadow-xl text-center space-y-4'>
        <h2 className='text-xl font-bold'>You're not in a couple yet 💔</h2>

        {generatedCode ? (
          <div className='space-y-2'>
            <p className='text-gray-700'>Share this code:</p>
            <div className='flex justify-center items-center space-x-2'>
              <p className='text-md font-mono bg-gray-100 rounded-lg py-2 px-4'>{generatedCode}</p>
              <button onClick={handleCopyCode} className='text-sm bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600'>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        ) : (
          <button className='bg-pink-400 text-white px-4 py-2 rounded-xl' onClick={handleGenerateInviteCode}>
            Generate Invite Code
          </button>
        )}

        <div className='mt-4'>
          <input type='text' className='border rounded-xl px-3 py-2 w-full' placeholder='Enter invite code' value={code} onChange={(event) => setCode(event.target.value)} />
          <button className='bg-green-500 text-white mt-2 px-4 py-2 rounded-xl w-full' onClick={handleSubmitCode}>
            Join partner
          </button>
        </div>
      </div>
    </div>
  )
}
