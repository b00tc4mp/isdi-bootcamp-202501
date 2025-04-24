import { useEffect, useState } from 'react'
import { logic } from '../logic'
import { DiaryEntryDetail } from './DiaryEntryDetail'
import { useContext } from '../context'

export function Diary() {
  const { alert } = useContext()

  const [entries, setEntries] = useState([])
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [text, setText] = useState('')

  const loadEntries = () => {
    try {
      logic
        .retrieveDiaryEntries()
        .then(setEntries)
        .catch((error) => {
          console.error(error)
          alert(error.message)
        })
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }

  useEffect(() => {
    loadEntries()
  }, [])

  const handleBack = () => history.back()

  const handleSelectEntry = (entry) => setSelectedEntry(entry)

  const handleCreateModal = () => setShowCreateModal(true)

  const handleCreateEntry = () => {
    try {
      if (!text.trim()) return alert('Text is required')

      logic
        .createDiaryEntry(text)
        .then(() => {
          setShowCreateModal(false)
          setText('')
          loadEntries()
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

  const handleCancelCreate = () => {
    setShowCreateModal(false)
    setText('')
  }

  const handleSaveEdit = (entryId, newText) => {
    setEntries((prevEntries) => prevEntries.map((entry) => (entry.id === entryId ? { ...entry, text: newText } : entry)))
    setSelectedEntry((prevSelected) => (prevSelected?.id === entryId ? { ...prevSelected, text: newText } : prevSelected))
  }

  const handleDelete = () => {
    loadEntries()
  }

  if (selectedEntry) {
    return <DiaryEntryDetail entry={selectedEntry} onClose={() => setSelectedEntry(null)} onSaveEdit={handleSaveEdit} onDelete={handleDelete} />
  }

  return (
    <div className='min-h-screen bg-pink-100 p-6'>
      <div className='max-w-md mx-auto space-y-6'>
        <div className='flex items-center space-x-4'>
          <button onClick={handleBack} className='bg-white w-10 h-10 rounded-xl shadow text-xl'>
            ←
          </button>
          <h1 className='text-xl font-bold'>DIARY</h1>
        </div>
        <div className='max-w-md mx-auto bg-white rounded-3xl p-6 shadow space-y-4'>
          <ul className='space-y-3 max-h-[60vh] overflow-y-auto px-2 py-4'>
            {entries.map((entry) => (
              <li key={entry.id} className={`cursor-pointer p-4 rounded-xl shadow transition hover:scale-[1.01] ${entry.own ? 'bg-pink-400/80 text-white font-semibold' : 'bg-pink-100 text-black'}`} onClick={() => handleSelectEntry(entry)}>
                <div className='flex justify-between items-center mb-1'>
                  <span className='text-sm font-semibold'>{entry.author.name}</span>
                  <span className='text-xs'>{new Date(entry.createdAt).toLocaleDateString()}</span>
                </div>
                <p className='text-sm truncate'>{entry.text.length > 120 ? entry.text.slice(0, 120) + '...' : entry.text}</p>
              </li>
            ))}
          </ul>
          <div className='pt-2 flex justify-center'>
            <button onClick={handleCreateModal} className='bg-pink-400 text-white w-12 h-12 rounded-full text-2xl shadow-lg'>
              +
            </button>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-2xl w-80 space-y-4 shadow-lg relative'>
            <h2 className='text-lg font-bold'>New Diary Entry</h2>
            <textarea className='border w-full rounded-xl px-3 py-2 h-40 resize-none' value={text} onChange={(event) => setText(event.target.value)} placeholder='Write something...' maxLength={2000} />
            <div className='flex justify-between mt-4'>
              <button onClick={handleCancelCreate} className='text-sm text-gray-500'>
                Cancel
              </button>
              <button onClick={handleCreateEntry} className='bg-pink-400 text-white px-4 py-2 rounded-xl'>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
