import { useEffect, useState } from 'react'
import { logic } from '../../logic/lists'
import { ListDetail } from './ListDetail.jsx'

export function Lists() {
  const [lists, setLists] = useState([])
  const [selectedList, setSelectedList] = useState(null)

  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState('')
  const [color, setColor] = useState(null)
  const [editingListId, setEditingListId] = useState(null)

  const loadLists = () => {
    logic
      .retrieveLists()
      .then(setLists)
      .catch((error) => {
        console.error(error)

        alert(error.message)
      })
  }

  useEffect(() => {
    loadLists()
  }, [])

  const openCreateModal = () => {
    setEditMode(false)
    setTitle('')
    setColor('#FFB8F0')
    setShowModal(true)
  }

  const openEditModal = (list) => {
    setEditMode(true)
    setTitle(list.title)
    setColor(list.color)
    setEditingListId(list._id)
    setShowModal(true)
  }

  const handleSave = () => {
    if (editMode) {
      logic
        .updateList(editingListId, title, color)
        .then(() => {
          setShowModal(false)
          loadLists()
        })
        .catch((error) => {
          console.error(error)

          alert(error.message)
        })
    } else {
      logic
        .createList(title, color)
        .then(() => {
          setShowModal(false)
          loadLists()
        })
        .catch((error) => {
          console.error(error)

          alert(error.message)
        })
    }
  }

  const handleDelete = (listId) => {
    if (confirm('Delete the list?')) {
      logic
        .deleteList(listId)
        .then(loadLists)
        .catch((error) => {
          console.error(error)

          alert(error.message)
        })
    }
  }

  if (selectedList) {
    return <ListDetail list={selectedList} onBack={() => setSelectedList(null)} />
  }

  return (
    <div className='min-h-screen bg-pink-100 p-6'>
      <div className='max-w-md mx-auto space-y-4'>
        <h1 className='text-2xl font-bold text-center'>Your Lists</h1>

        {lists.map((list) => (
          <div key={list._id} className='flex justify-between items-center bg-white p-4 rounded-xl shadow cursor-pointer' onClick={() => setSelectedList(list)}>
            <div className='flex items-center space-x-3'>
              <div className='w-3 h-12 rounded-full' style={{ backgroundColor: list.color }}></div>
              <span className='font-semibold'>{list.title}</span>
            </div>

            <div className='flex items-center space-x-2'>
              <button
                onClick={(event) => {
                  event.stopPropagation()
                  openEditModal(list)
                }}
                className='text-sm text-blue-500'>
                ✏️
              </button>
              <button
                onClick={(event) => {
                  event.stopPropagation()
                  handleDelete(list._id)
                }}
                className='text-sm text-red-500'>
                🗑️
              </button>
            </div>
          </div>
        ))}
        <div className='flex justify-center'>
          <button onClick={openCreateModal} className='bg-pink-500 text-white w-12 h-12 rounded-full text-2xl shadow-lg'>
            +
          </button>
        </div>
      </div>

      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-2xl w-80 space-y-4 shadow-lg'>
            <h2 className='text-lg font-bold'>{editMode ? 'Edit List' : 'New List'}</h2>
            <input type='text' className='border w-full rounded-xl px-3 py-2' placeholder='Title' value={title} onChange={(event) => setTitle(event.target.value)} />
            <input type='color' className='w-full h-10 rounded' value={color} onChange={(event) => setColor(event.target.value)} />
            <div className='flex justify-between mt-4'>
              <button onClick={() => setShowModal(false)} className='text-sm text-gray-500'>
                Cancel
              </button>
              <button onClick={handleSave} className='bg-pink-500 text-white px-4 py-2 rounded-xl'>
                {editMode ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
