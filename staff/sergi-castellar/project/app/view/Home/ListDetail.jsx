import { useEffect, useState } from 'react'
import { logic } from '../../logic/lists'

export function ListDetail({ list, onBack }) {
  const { _id: listId, title, color } = list

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
        .updateItem(editItem._id, text)
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

  const handleDelete = (itemId) => {
    if (confirm('Are you sure?')) {
      logic
        .deleteItem(itemId)
        .then(loadItems)
        .catch((error) => {
          console.error(error)

          alert(error.message)
        })
    }
  }

  return (
    <div className='min-h-screen bg-pink-100 p-6'>
      <div className='max-w-md mx-auto bg-white rounded-3xl p-6 shadow-md space-y-4'>
        <div className='flex items-center justify-between'>
          <button onClick={onBack} className='text-sm text-gray-500'>
            ← Back
          </button>
          <h1 className='text-xl font-bold text-center flex-1'>{title}</h1>
          <div className='w-6 h-6 rounded-full' style={{ backgroundColor: color }}></div>
        </div>

        <ul className='space-y-2'>
          {items.map((item) => (
            <li key={item._id} className='flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg'>
              <span>{item.text}</span>
              <div className='space-x-2'>
                <button
                  onClick={() => {
                    setEditItem(item)
                    setText(item.text)
                    setShowModal(true)
                  }}
                  className='text-sm text-blue-500'>
                  ✏️
                </button>
                <button onClick={() => handleDelete(item._id)} className='text-sm text-red-500'>
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className='flex justify-center'>
          <button
            onClick={() => {
              setEditItem(null)
              setText('')
              setShowModal(true)
            }}
            className='bg-pink-500 text-white w-12 h-12 rounded-full text-2xl shadow-lg'>
            +
          </button>
        </div>
      </div>

      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-2xl w-80 space-y-4 shadow-lg'>
            <h2 className='text-lg font-bold'>{editItem ? 'Edit Item' : 'New Item'}</h2>
            <input type='text' className='border w-full rounded-xl px-3 py-2' value={text} onChange={(event) => setText(event.target.value)} placeholder='Write something...' />
            <div className='flex justify-between mt-4'>
              <button onClick={() => setShowModal(false)} className='text-sm text-gray-500'>
                Cancel
              </button>
              <button onClick={handleSubmit} className='bg-pink-500 text-white px-4 py-2 rounded-xl'>
                {editItem ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
