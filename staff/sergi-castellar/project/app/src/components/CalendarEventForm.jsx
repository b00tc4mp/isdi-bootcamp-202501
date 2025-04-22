import { useState } from 'react'
import { logic } from '../logic'

export function CalendarEventForm({ event, date, onClose }) {
  const isEditing = Boolean(event)

  const [title, setTitle] = useState(event?.title || '')
  const [description, setDescription] = useState(event?.description || '')

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      alert('Please fill in both title and description')
      return
    }

    const action = isEditing ? logic.updateCalendarEvent(event.id, title, description) : logic.createCalendarEvent(date.toISOString(), title, description)

    action
      .then(() => onClose())
      .catch((error) => {
        console.error(error)

        alert(error.message)
      })
  }

  return (
    <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-2xl w-80 space-y-4 shadow-lg relative'>
        <h2 className='text-lg font-bold'>{isEditing ? 'Edit Event' : 'New Event'}</h2>

        <input type='text' className='border w-full rounded-xl px-3 py-2' placeholder='Title' value={title} onChange={(event) => setTitle(event.target.value)} />

        <textarea className='border w-full rounded-xl px-3 py-2 h-24 resize-none' placeholder='Description' value={description} onChange={(event) => setDescription(event.target.value)} />

        <div className='flex justify-between mt-4'>
          <button onClick={onClose} className='text-sm text-gray-500'>
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
