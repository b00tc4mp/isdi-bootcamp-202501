import { useState } from 'react'
import { DiaryEntryForm } from './DiaryEntryForm'
import { logic } from '../logic'
import { useContext } from '../context'

export function DiaryEntryDetail({ entry, onClose, onUpdated }) {
  const { alert, confirm } = useContext()
  const [editMode, setEditMode] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)

  const handleDeleteEntry = () => {
    confirm('Delete this entry?').then((accepted) => {
      if (accepted) {
        logic
          .deleteDiaryEntry(entry.id)
          .then(() => {
            onUpdated()
            onClose()
          })
          .catch((error) => {
            console.error(error)

            alert(error.message)
          })
      }
    })
  }

  const handleEditEntry = () => {
    setEditMode(true)
  }

  const handleCancel = () => {
    setEditMode(false)
    onUpdated()
  }

  const handleBack = () => onClose()

  return (
    <div className='min-h-screen bg-pink-100 p-6'>
      <div className={`max-w-md mx-auto p-6 rounded-3xl shadow space-y-4 bg-white text-black`}>
        <button onClick={handleBack} className='text-sm text-gray-600 mb-2'>
          ← Back
        </button>

        <div className='flex justify-between items-center'>
          <span className='text-sm font-semibold'>{entry.author.name}</span>
          <span className='text-xs'>{new Date(entry.createdAt).toLocaleDateString()}</span>
        </div>

        <p className='text-sm whitespace-pre-wrap'>{entry.text}</p>

        {entry.own && (
          <div className='flex justify-end space-x-2 text-sm'>
            <button onClick={handleEditEntry} className='text-blue-200'>
              ✏️
            </button>
            <button onClick={handleDeleteEntry} className='text-red-200'>
              🗑️
            </button>
          </div>
        )}

        {editMode && <DiaryEntryForm event={editingEvent} entry={entry} onClose={handleCancel} />}
      </div>
    </div>
  )
}
