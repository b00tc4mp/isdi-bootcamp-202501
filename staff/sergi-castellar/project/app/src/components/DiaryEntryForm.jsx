import { useState } from 'react'
import { logic } from '../logic'
import { useContext } from '../context'

export function DiaryEntryForm({ entry, onClose }) {
  const { alert } = useContext()
  const isEditing = Boolean(entry) //??

  const [text, setText] = useState(entry?.text || '')

  const handleSubmit = () => {
    if (!text.trim()) return alert('Text is required')

    const action = isEditing ? logic.updateDiaryEntry(entry.id, text) : logic.createDiaryEntry(text)

    action
      .then(() => onClose())
      .catch((error) => {
        console.error(error)

        alert(error.message)
      })
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <div className='fixed inset-0 bg-black/40 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-2xl w-80 space-y-4 shadow-lg relative'>
        <h2 className='text-lg font-bold'>{isEditing ? 'Edit entry' : 'New diary entry'}</h2>

        <textarea className='border w-full rounded-xl px-3 py-2 h-40 resize-none' placeholder='Write something...' value={text} maxLength={2000} onChange={(event) => setText(event.target.value)} />

        <div className='flex justify-between mt-4'>
          <button onClick={handleCancel} className='text-sm text-gray-500'>
            Cancel
          </button>
          <button onClick={handleSubmit} className='bg-pink-400 text-white px-4 py-2 rounded-xl'>
            {isEditing ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  )
}
