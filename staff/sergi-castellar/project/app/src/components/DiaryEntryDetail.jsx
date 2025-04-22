import { useState } from 'react'
import { DiaryEntryForm } from './DiaryEntryForm'
import { logic } from '../logic'

export function DiaryEntryDetail({ entry, onClose, onUpdated }) {
  const [editMode, setEditMode] = useState(false)

  const handleDelete = () => {
    if (!confirm('Delete this entry?')) return

    logic.diary
      .deleteDiaryEntry(entry.id)
      .then(() => {
        onUpdated()
        onClose()
      })
      .catch((error) => alert(error.message))
  }

  const formatDate = (iso) => {
    const date = new Date(iso)
    return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}`
  }

  return (
    <div className='min-h-screen bg-pink-100 p-6'>
      <div className={`max-w-md mx-auto p-6 rounded-3xl shadow space-y-4 ${entry.own ? 'bg-pink-800 text-white' : 'bg-white text-pink-800'}`}>
        <button onClick={onClose} className='text-sm text-gray-600 mb-2'>
          ← Back
        </button>

        <div className='flex justify-between items-center'>
          <span className='text-sm font-semibold'>{entry.author.name}</span>
          <span className='text-xs'>{formatDate(entry.createdAt)}</span>
        </div>

        <p className='text-sm whitespace-pre-wrap'>{entry.text}</p>

        {entry.own && (
          <div className='flex justify-end space-x-2 text-sm'>
            <button onClick={() => setEditMode(true)} className='text-blue-200'>
              ✏️
            </button>
            <button onClick={handleDelete} className='text-red-200'>
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
