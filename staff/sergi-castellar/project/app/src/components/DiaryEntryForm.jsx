import { useState } from 'react'
import { logic } from '../logic'

export function DiaryEntryForm({ entry = null, onClose }) {
  const isEditing = Boolean(entry)

  const [text, setText] = useState(entry?.text || '')

  const handleSubmit = () => {
    if (!text.trim()) return alert('Text is required.')

    const action = isEditing ? logic.updateDiaryEntry(entry.id, text) : logic.createDiaryEntry(text)

    action
      .then(() => onClose())
      .catch((error) => {
        console.error(error)

        alert(error.message)
      })
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-2xl w-80 space-y-4 shadow-lg relative'>
        <button onClick={onClose} className='absolute top-2 right-4 text-gray-400 text-xl'>
          ✕
        </button>

        <h2 className='text-lg font-bold'>{isEditing ? 'Edit entry' : 'New diary entry'}</h2>

        <textarea className='border w-full rounded-xl px-3 py-2 h-40 resize-none' placeholder='Write something...' value={text} maxLength={2000} onChange={(e) => setText(e.target.value)} />

        <div className='flex justify-end mt-2'>
          <button onClick={handleSubmit} className='bg-pink-500 text-white px-4 py-2 rounded-xl'>
            {isEditing ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  )
}
