import { useEffect, useState } from 'react'
import { logic } from '../logic'
import { useContext } from '../context'

export function ListDetail({ list, onBack }) {
  const { alert, confirm } = useContext()
  const { id: listId, title, color } = list

  const [items, setItems] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [text, setText] = useState('')

  const loadItems = () => {
    logic
      .retrieveItems(listId)
      .then(setItems)
      .catch((error) => {
        console.error(error)

        alert(error.message)
      })
  }

  useEffect(() => {
    loadItems()
  }, [])

  const handleSubmit = () => {
    if (editItem) {
      logic
        .updateItem(editItem.id, text)
        .then(() => {
          setShowModal(false)
          setEditItem(null)
          setText('')
          loadItems()
        })
        .catch((error) => {
          console.error(error)

          alert(error.message)
        })
    } else {
      logic
        .createItem(listId, text)
        .then(() => {
          setShowModal(false)
          setText('')
          loadItems()
        })
        .catch((error) => {
          console.error(error)

          alert(error.message)
        })
    }
  }

  const handleDeleteItem = (itemId) => {
    confirm('Are you sure?').then((accepted) => {
      if (accepted) {
        logic
          .deleteItem(itemId)
          .then(loadItems)
          .catch((error) => {
            console.error(error)

            alert(error.message)
          })
      }
    })
  }

  const handleEditItem = (item) => {
    setEditItem(item)
    setText(item.text)
    setShowModal(true)
  }

  const handleCreateItem = () => {
    setEditItem(null)
    setText('')
    setShowModal(true)
  }

  const handleBack = () => onBack()

  const handleCancel = () => setShowModal(false)

  return (
    <div className='min-h-screen bg-pink-100 p-6'>
      <div className='max-w-md mx-auto bg-white rounded-3xl p-6 shadow-md space-y-4'>
        <div className='flex items-center justify-between'>
          <button onClick={handleBack} className='text-sm text-gray-500'>
            ← Back
          </button>
          <h1 className='text-xl font-bold text-center flex-1'>{title}</h1>
          <div className='w-6 h-6 rounded-full' style={{ backgroundColor: color }}></div>
        </div>

        <ul className='space-y-2'>
          {items.map((item) => (
            <li key={item.id} className='flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg'>
              <span>{item.text}</span>
              <div className='space-x-2'>
                <button onClick={() => handleEditItem(item)}>✏️</button>
                <button onClick={() => handleDeleteItem(item.id)}>🗑️</button>
              </div>
            </li>
          ))}
        </ul>
        <div className='flex justify-center'>
          <button onClick={handleCreateItem} className='bg-pink-400 text-white w-12 h-12 rounded-full text-2xl shadow-lg'>
            +
          </button>
        </div>
      </div>

      {showModal && (
        <div className='fixed inset-0 bg-black/70 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-2xl w-80 space-y-4 shadow-lg'>
            <h2 className='text-lg font-bold'>{editItem ? 'Edit Item' : 'New Item'}</h2>
            <input type='text' className='border w-full rounded-xl px-3 py-2' value={text} onChange={(event) => setText(event.target.value)} placeholder='Write something...' />
            <div className='flex justify-between mt-4'>
              <button onClick={handleCancel} className='text-sm text-gray-500'>
                Cancel
              </button>
              <button onClick={handleSubmit} className='bg-pink-400 text-white px-4 py-2 rounded-xl'>
                {editItem ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
