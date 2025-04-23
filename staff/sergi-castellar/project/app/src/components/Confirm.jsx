export const Confirm = ({ title, message, onAccepted, onCancelled }) => {
  const handleCancelClick = () => onCancelled()

  const handleAcceptClick = () => onAccepted()

  return (
    <div className='fixed inset-0 flex items-start justify-center pt-24 bg-black/40'>
      <div className='bg-white rounded-2xl py-10 px-10 w-90 space-y-4 shadow-lg text-center'>
        <h2 className='text-xl font-bold text-gray-800'>{title}</h2>
        <p className='text-gray-600'>{message}</p>
        <div className='flex justify-between pt-2 space-x-4'>
          <button type='button' onClick={handleCancelClick} className='text-sm text-gray-500 px-4 py-2 rounded-xl border border-gray-300 w-full'>
            Cancel
          </button>
          <button type='button' onClick={handleAcceptClick} className='bg-pink-400 text-white px-4 py-2 rounded-xl w-full'>
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
