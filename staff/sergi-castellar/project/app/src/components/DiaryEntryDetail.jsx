import { useState } from 'react'
import { DiaryEntryForm } from './DiaryEntryForm'
import { logic } from '../logic'

export function DiaryEntryDetail({ entry, onClose, onUpdated }) {
  const isOwn = logic.getCurrentUserId() === entry.author._id
  const [editMode, setEditMode] = useState(false)

  const handleDelete = () => {
    if (!confirm('Delete this entry?')) return

    logic
      .deleteDiaryEntry(entry._id)
      .then(() => {
        onUpdated()
        onClose()
      })
      .catch((error) => alert(error.message))
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
      <div className={`bg-white p-6 rounded-3xl w-full max-w-md shadow-xl space-y-4 relative ${isOwn ? 'bg-pink-100' : 'bg-pink-200'}`}>
        <button onClick={onClose} className='absolute top-2 right-4 text-gray-400 text-xl'>
          ✕
        </button>

        <div className='flex justify-between items-center'>
          <span className='text-sm font-semibold'>{entry.author.name}</span>
          <span className='text-xs'>{new Date(entry.createdAt).toLocaleDateString()}</span>
        </div>

        <p className='text-sm whitespace-pre-wrap'>{entry.text}</p>

        {isOwn && (
          <div className='flex justify-end space-x-2 text-sm'>
            <button onClick={() => setEditMode(true)} className='text-blue-500'>
              ✏️
            </button>
            <button onClick={handleDelete} className='text-red-500'>
              🗑️
            </button>
          </div>
        )}

        {editMode && (
          <DiaryEntryForm
            entry={entry}
            onClose={() => {
              setEditMode(false)
              onUpdated()
              onClose()
            }}
          />
        )}
      </div>
    </div>
  )
}
