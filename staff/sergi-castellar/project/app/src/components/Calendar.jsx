import { useEffect, useState } from 'react'
import { logic } from '../logic'

import { CalendarDayView } from './CalendarDayView'
import { useContext } from '../context'

export function Calendar() {
  const { alert } = useContext()

  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [events, setEvents] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1)
  const getLastDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0)

  const firstDayOfMonth = getFirstDayOfMonth(currentMonth)
  const lastDayOfMonth = getLastDayOfMonth(currentMonth)

  const weekDayFirstDay = firstDayOfMonth.getDay()
  const daysNeededBefore = (weekDayFirstDay + 6) % 7

  const daysInMonth = []
  for (let day = new Date(firstDayOfMonth); day <= lastDayOfMonth; day.setDate(day.getDate() + 1)) {
    daysInMonth.push(new Date(day))
  }

  const prevMonthDays = Array.from({ length: daysNeededBefore }, () => '')

  const allDaysInGrid = [...prevMonthDays, ...daysInMonth]

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const handlePrevYear = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth(), 1))
  }

  const handleNextYear = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth(), 1))
  }

  const handleBack = () => history.back()

  const handleSelectDay = (day) => setSelectedDate(new Date(day))

  const loadEvents = () => {
    try {
      logic
        .retrieveMonthCalendarEvents(year, month)
        .then(({ events }) => setEvents(events))
        .catch((error) => {
          console.error(error)

          alert(error.message)
        })
    } catch (error) {
      console.error(error)

      alert(error.messsage)
    }
  }

  useEffect(() => {
    try {
      loadEvents()
    } catch (error) {
      console.error(error)

      alert(error.messsage)
    }
  }, [currentMonth, refreshTrigger])

  const dateHasEvents = (date) => {
    return events.some((event) => {
      const eventDate = new Date(event.eventDate)
      return eventDate.getFullYear() === date.getFullYear() && eventDate.getMonth() === date.getMonth() && eventDate.getDate() === date.getDate()
    })
  }

  const isToday = (date) => new Date().toLocaleDateString() === date.toLocaleDateString()

  const monthNameAndYear = `${currentMonth.toLocaleString('en-US', { month: 'long' })} ${currentMonth.getFullYear()}`

  return (
    <div className='min-h-screen bg-pink-100 p-6'>
      <div className='max-w-md mx-auto space-y-6'>
        <div className='flex items-center space-x-4'>
          <button onClick={handleBack} className='bg-white w-10 h-10 rounded-xl shadow text-xl'>
            ←
          </button>
          <h1 className='text-xl font-bold'>CALENDAR</h1>
        </div>
        <div className='max-w-md mx-auto bg-white rounded-3xl p-6 shadow space-y-4'>
          <div className='flex justify-between items-center'>
            <button onClick={handlePrevYear} className='text-lg'>
              &laquo;&laquo;
            </button>
            <button onClick={handlePrevMonth} className='text-lg'>
              &lt;
            </button>
            <h2 className='text-xl font-bold text-center min-w-40'>{monthNameAndYear}</h2>
            <button onClick={handleNextMonth} className='text-lg'>
              &gt;
            </button>
            <button onClick={handleNextYear} className='text-lg'>
              &raquo;&raquo;
            </button>
          </div>

          <div className='grid grid-cols-7 gap-2 text-center font-semibold text-sm'>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            <div>Sun</div>
          </div>

          <div className='grid grid-cols-7 gap-2 text-center text-sm'>
            {allDaysInGrid.map((day, index) => {
              if (!day) return <div key={index} className='p-4'></div>

              const hasEvents = dateHasEvents(day)
              const today = isToday(day)

              return (
                <div
                  key={index}
                  className={`aspect-square flex items-center justify-center rounded-xl cursor-pointer relative transition
                  ${today ? 'bg-pink-400 text-white font-bold' : 'bg-pink-100 hover:bg-pink-100'}`}
                  onClick={() => handleSelectDay(day)}>
                  <span>{day.getDate()}</span>
                  {hasEvents && <div className='w-1.5 h-1.5 bg-pink-400 rounded-full absolute bottom-1 left-1/2 transform -translate-x-1/2'></div>}
                </div>
              )
            })}
          </div>
        </div>

        {selectedDate && <CalendarDayView date={selectedDate} onClose={() => setSelectedDate(null)} onRefresh={() => setRefreshTrigger((prev) => prev + 1)} />}
      </div>
    </div>
  )
}
