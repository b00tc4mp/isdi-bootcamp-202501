import { useEffect, useState } from 'react'
import { logic } from '../logic'
import { CalendarEventForm } from './CalendarEventForm'
import { useContext } from '../context'

export function CalendarDayView({ date, onClose, onRefresh }) {
  const { alert, confirm } = useContext()
  const [events, setEvents] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)

  const formattedDate = date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  const loadEvents = () => {
    const start = new Date(date)
    start.setHours(0, 0, 0, 0)
    const end = new Date(date)
    end.setHours(23, 59, 59, 999)

    logic
      .retrieveCalendarEvents(start, end)
      .then(({ events }) => setEvents(events))
      .catch((error) => {
        console.error(error)

        alert(error.message)
      })
  }

  useEffect(() => {
    loadEvents()
  }, [date])

  const handleDelete = (eventId) => {
    confirm('Delete this event?').then((accepted) => {
      if (accepted) {
        logic
          .deleteCalendarEvent(eventId)
          .then(() => {
            loadEvents()
            onRefresh()
          })
          .catch((error) => {
            console.error(error)

            alert(error.message)
          })
      }
    })
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingEvent(null)
    loadEvents()
    onRefresh()
  }

  const handleEdit = (event) => {
    setEditingEvent(event)
    setShowForm(true)
  }

  const handleCreate = () => {
    setEditingEvent(null)
    setShowForm(true)
  }

  const handleClose = () => onClose()

  return (
    <div className='fixed inset-0 bg-black/70 flex items-center justify-center'>
      <div className='bg-white rounded-3xl p-6 w-full max-w-md shadow-xl space-y-4 relative'>
        <button onClick={handleClose} className='absolute top-2 right-4 text-gray-400 text-xl'>
          ✕
        </button>

        <h2 className='text-center text-lg font-bold text-pink-500'>{formattedDate}</h2>

        <div className='space-y-2 max-h-64 overflow-y-auto'>
          {events.length === 0 && <p className='text-center text-sm text-gray-400'>No events for this day</p>}

          {events.map((event) => (
            <div key={event.id} className='bg-pink-100 p-3 rounded-xl shadow flex justify-between items-start'>
              <div>
                <h3 className='font-semibold'>{event.title}</h3>
                <p className='text-sm text-gray-700'>{event.description}</p>
              </div>
              <div className='space-x-2 text-sm flex-shrink-0'>
                <button onClick={() => handleEdit(event)} className='text-blue-500'>
                  ✏️
                </button>
                <button onClick={() => handleDelete(event.id)} className='text-red-500'>
                  🗑️
                </button>
              </div>
            </div>
          ))}
          <div className='pt-2 flex justify-center'>
            <button onClick={handleCreate} className='bg-pink-400 text-white w-12 h-12 rounded-full text-2xl shadow-lg'>
              +
            </button>
          </div>
        </div>

        {showForm && <CalendarEventForm event={editingEvent} date={date} onCancel={handleCancel} />}
      </div>
    </div>
  )
}
