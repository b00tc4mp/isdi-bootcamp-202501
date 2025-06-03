import { useState, useEffect } from 'react'
import { logic } from '../logic'
import { useContext } from '../context'

export function DiaryEntryDetail({ entry, onClose, onSaveEdit, onDelete }) {
  const { alert, confirm } = useContext()

  const [editMode, setEditMode] = useState(false)
  const [text, setText] = useState(entry.text)

  useEffect(() => {
    setText(entry.text)
  }, [entry])

  const handleDeleteEntry = () => {
    try {
      confirm('Are you sure you want to delete this entry?').then((accepted) => {
        if (accepted) {
          logic
            .deleteDiaryEntry(entry.id)
            .then(() => {
              onClose()
              onDelete()
            })
            .catch((error) => {
              console.error(error)
              alert(error.message)
            })
        }
      })
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }

  const handleEditEntry = () => {
    setEditMode(true)
  }

  const handleCancelEdit = () => {
    setEditMode(false)
    setText(entry.text)
  }

  const handleSaveEdit = () => {
    try {
      if (!text.trim()) return alert('Text is required')

      logic
        .updateDiaryEntry(entry.id, text)
        .then(() => {
          setEditMode(false)
          onSaveEdit(entry.id, text)
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

  const handleBack = () => onClose()

  return (
    <div className='min-h-screen bg-pink-100 p-6'>
      <div className='max-w-md mx-auto p-6 rounded-3xl shadow space-y-4 bg-white text-black'>
        <button onClick={handleBack} className='text-sm text-gray-600 mb-2'>
          ← Back
        </button>

        <div className='flex justify-between items-center'>
          <span className='text-sm font-semibold'>{entry.author.name}</span>
          <span className='text-xs'>{new Date(entry.createdAt).toLocaleDateString()}</span>
        </div>

        {editMode ? <textarea className='w-full border px-3 py-2 rounded-xl' value={text} onChange={(event) => setText(event.target.value)} maxLength={2000} /> : <p className='text-sm whitespace-pre-wrap truncate'>{entry.text}</p>}

        {entry.own && (
          <div className='flex justify-end space-x-2 text-sm'>
            {!editMode && (
              <>
                <button onClick={handleEditEntry}>✏️</button>
                <button onClick={handleDeleteEntry}>🗑️</button>
              </>
            )}
            {editMode && (
              <>
                <button onClick={handleCancelEdit} className='text-gray-500'>
                  Cancel
                </button>
                <button onClick={handleSaveEdit}>Save</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
