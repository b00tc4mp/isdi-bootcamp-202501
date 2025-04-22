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
      <div className='max-w-md mx-auto bg-pink-200 rounded-3xl p-6 shadow space-y-4'>
        <h1 className='text-xl font-bold text-center text-pink-700'>DIARY</h1>

        <div className='space-y-3 max-h-[60vh] overflow-y-auto pr-2 scrollbar-none'>
          {entries.map((entry) => (
            <div key={entry.id} onClick={() => setSelectedEntry(entry)} className={`cursor-pointer p-4 rounded-xl shadow transition hover:scale-[1.01] ${entry.own ? 'bg-pink-800 text-white' : 'bg-white text-pink-800'}`}>
              <div className='flex justify-between items-center mb-1'>
                <span className='text-sm font-semibold'>{entry.author.name}</span>
                <span className='text-xs'>{formatDate(entry.createdAt)}</span>
              </div>
              <p className='text-sm'>{getPreview(entry.text)}</p>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => setShowForm(true)} className='fixed bottom-6 right-6 bg-pink-500 text-white w-12 h-12 rounded-full text-2xl shadow-lg'>
        +
      </button>

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
