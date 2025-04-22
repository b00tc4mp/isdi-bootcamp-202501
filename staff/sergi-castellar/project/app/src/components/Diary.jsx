import { useEffect, useState } from 'react'
import { logic } from '../logic'
import { DiaryEntryForm } from './DiaryEntryForm'
import { DiaryEntryDetail } from './DiaryEntryDetail'

export function Diary() {
  const [entries, setEntries] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState(null)

  const loadEntries = () => {
    logic
      .retrieveDiaryEntries()
      .then(setEntries)
      .catch((error) => {
        console.error(error)

        alert(error.message)
      })
  }

  useEffect(() => {
    loadEntries()
  }, [])

  const getPreview = (text) => {
    const firstLine = text.split('\n')[0]
    return firstLine.length > 120 ? firstLine.slice(0, 120) + '...' : firstLine
  }

  const formatDate = (iso) => {
    const date = new Date(iso)
    return `${date.getDate()} ${date.toLocaleString('en-US', { month: 'short' })}`
  }

  if (selectedEntry) {
    return <DiaryEntryDetail entry={selectedEntry} onClose={() => setSelectedEntry(null)} onUpdated={loadEntries} />
  }

  return (
    <div className='min-h-screen bg-pink-100 p-6'>
      <div className='max-w-md mx-auto space-y-6'>
        <div className='flex items-center space-x-4'>
          <button onClick={() => history.back()} className='bg-white w-10 h-10 rounded-xl shadow text-xl'>
            ←
          </button>
          <h1 className='text-xl font-bold'>DIARY</h1>
        </div>
        <div className='max-w-md mx-auto bg-white rounded-3xl p-6 shadow space-y-4'>
          <div className='space-y-3 max-h-[60vh] overflow-y-auto px-2 pt-4 scrollbar-none'>
            {entries.map((entry) => (
              <div key={entry.id} onClick={() => setSelectedEntry(entry)} className={`cursor-pointer p-4 rounded-xl shadow transition hover:scale-[1.01] ${entry.own ? 'bg-pink-400/80 text-white font-semibold' : 'bg-pink-100 text-black'}`}>
                <div className='flex justify-between items-center mb-1'>
                  <span className='text-sm font-semibold'>{entry.author.name}</span>
                  <span className='text-xs'>{formatDate(entry.createdAt)}</span>
                </div>
                <p className='text-sm'>{getPreview(entry.text)}</p>
              </div>
            ))}
          </div>
          <div className='pt-2 flex justify-center'>
            <button onClick={() => setShowForm(true)} className='bg-pink-400 text-white w-12 h-12 rounded-full text-2xl shadow-lg'>
              +
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <DiaryEntryForm
          onClose={() => {
            setShowForm(false)
            loadEntries()
          }}
        />
      )}
    </div>
  )
}
