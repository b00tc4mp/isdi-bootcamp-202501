import { useEffect, useState } from 'react'
import { logic } from '../logic/index.js'
import { ListDetail } from './ListDetail.jsx'
import { useContext } from '../context'

export function Lists() {
  const { alert, confirm } = useContext()
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

  const handleOpenCreateModal = () => {
    setEditMode(false)
    setTitle('')
    setColor('#FFB8F0')
    setShowModal(true)
  }

  const handleOpenEditModal = (list) => {
    setEditMode(true)
    setTitle(list.title)
    setColor(list.color)
    setEditingListId(list.id)
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
    confirm('Delete the list?').then((accepted) => {
      if (accepted) {
        logic
          .deleteList(listId)
          .then(loadLists)
          .catch((error) => {
            console.error(error)

            alert(error.message)
          })
      }
    })
  }

  const handleCancel = () => setShowModal(false)

  const handleBack = () => history.back()

  const handleSelectList = (list) => setSelectedList(list)

  const handleEditList = (event, list) => {
    event.stopPropagation()
    handleOpenEditModal(list)
  }

  const handleDeleteList = (event, list) => {
    event.stopPropagation()
    handleDelete(list.id)
  }

  if (selectedList) {
    return <ListDetail list={selectedList} onBack={() => setSelectedList(null)} />
  }

  return (
    <div className='min-h-screen bg-pink-100 p-6'>
      <div className='max-w-md mx-auto space-y-4'>
        <div className='flex items-center space-x-4'>
          <button onClick={handleBack} className='bg-white w-10 h-10 rounded-xl shadow text-xl'>
            ←
          </button>
          <h1 className='text-xl font-bold'>LISTS</h1>
        </div>

        <ul className='space-y-2'>
          {lists.map((list) => (
            <li key={list.id} className='flex justify-between items-center bg-white p-4 rounded-xl shadow cursor-pointer' onClick={() => handleSelectList(list)}>
              <div className='flex items-center space-x-3'>
                <div className='w-3 h-12 rounded-full' style={{ backgroundColor: list.color }}></div>
                <span className='font-semibold'>{list.title}</span>
              </div>

              <div className='flex items-center space-x-2'>
                <button onClick={(event) => handleEditList(event, list)}>✏️</button>
                <button onClick={(event) => handleDeleteList(event, list)}>🗑️</button>
              </div>
            </li>
          ))}
        </ul>
        <div className='flex justify-center'>
          <button onClick={handleOpenCreateModal} className='bg-pink-400 text-white w-12 h-12 rounded-full text-2xl shadow-lg'>
            +
          </button>
        </div>
      </div>

      {showModal && (
        <div className='fixed inset-0 bg-black/70 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-2xl w-80 space-y-4 shadow-lg'>
            <h2 className='text-lg font-bold'>{editMode ? 'Edit List' : 'New List'}</h2>
            <input type='text' className='border w-full rounded-xl px-3 py-2' placeholder='Title' value={title} onChange={(event) => setTitle(event.target.value)} />
            <input type='color' className='w-full h-10 rounded' value={color} onChange={(event) => setColor(event.target.value)} />
            <div className='flex justify-between mt-4'>
              <button onClick={handleCancel} className='text-sm text-gray-500'>
                Cancel
              </button>
              <button onClick={handleSave} className='bg-pink-400 text-white px-4 py-2 rounded-xl'>
                {editMode ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
