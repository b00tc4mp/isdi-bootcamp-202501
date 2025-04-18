import { useState } from 'react'

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1)
  const getLastDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0)

  const firstDayOfMonth = getFirstDayOfMonth(currentMonth)
  const lastDayOfMonth = getLastDayOfMonth(currentMonth)

  const weekDayFirstDay = firstDayOfMonth.getDay()
  const daysNeededBefore = weekDayFirstDay - 1

  const daysInMonth = []
  for (let day = firstDayOfMonth; day <= lastDayOfMonth; day.setDate(day.getDate() + 1)) {
    daysInMonth.push(new Date(day))
  }

  const prevMonthDays = []
  for (let i = 0; i < daysNeededBefore; i++) {
    prevMonthDays.push('')
  }

  const allDaysInGrid = [...prevMonthDays, ...daysInMonth]

  const monthNameAndYear = `${currentMonth.toLocaleString('en-US', {
    month: 'long',
  })} ${currentMonth.getFullYear()}`

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))
  }

  const handlePrevYear = () => {
    setCurrentMonth(new Date(currentMonth.setFullYear(currentMonth.getFullYear() - 1)))
  }

  const handleNextYear = () => {
    setCurrentMonth(new Date(currentMonth.setFullYear(currentMonth.getFullYear() + 1)))
  }

  return (
    <div className='w-full max-w-md mx-auto'>
      <div className='flex justify-between items-center py-4'>
        <button onClick={handlePrevYear} className='text-xl'>
          &laquo;&laquo;
        </button>
        <button onClick={handlePrevMonth} className='text-xl'>
          &lt;
        </button>
        <h2 className='text-lg font-bold mx-10 w-36 text-center'>{monthNameAndYear}</h2>
        <button onClick={handleNextMonth} className='text-xl'>
          &gt;
        </button>
        <button onClick={handleNextYear} className='text-xl'>
          &raquo;&raquo;
        </button>
      </div>
      <div className='grid grid-cols-7 gap-2 text-center font-semibold'>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        <div>Sun</div>
      </div>
      <div className='grid grid-cols-7 gap-2 text-center'>
        {allDaysInGrid.map((day, index) => {
          if (!day) return <div key={index} className='p-2'></div>

          const isToday = new Date().toLocaleDateString() === day.toLocaleDateString()
          return (
            <div key={index} className={`p-2 cursor-pointer ${isToday ? 'bg-blue-200' : 'text-gray-700'}`}>
              <span>{day.getDate()}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
