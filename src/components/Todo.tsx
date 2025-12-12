import { useState, useRef, useEffect } from 'react'
import './Todo.css'
import { type Todo as TodoType } from '../types'


interface Props {
  id: string
  title: string
  completed: boolean
  setCompleted: (params: Pick<TodoType, 'id' | 'completed'>) => void
  setTitle: (params: { id: string, title: string }) => void
  isEditing: string
  setIsEditing: (completed: string) => void
  removeTodo: (params: { id: string }) => void
}

export const Todo: React.FC<Props> = ({ 
  id,
  title,
  completed,
  setCompleted,
  setTitle,
  removeTodo,
  isEditing,
  setIsEditing
}) => {
  const [editedTitle, setEditedTitle] = useState(title)
  const inputEditTitle = useRef<HTMLInputElement>(null)

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      setEditedTitle(editedTitle.trim())

      if (editedTitle !== title) {
        setTitle({ id, title: editedTitle })
      }

      if (editedTitle === '') removeTodo({ id }) 
      setIsEditing('')
    }

    if (e.key === 'Escape') {
      setEditedTitle(title)
      setIsEditing('')
    }
  }

  useEffect(() => {
    inputEditTitle.current?.focus()
  }, [isEditing])
  
  return (
    <div className='view'>
      <input
        className='toggle'
        checked={completed}
        type='checkbox'
        style={{ pointerEvents: 'auto' }} 
        onChange={(e) => { setCompleted({ id, completed: e.target.checked }) }} 
        onTouchEnd={(e) => {
          e.stopPropagation()
          e.currentTarget.click()
        }}
      />
      <label 
        className={`title ${completed ? 'completed' : ''}`}
        onDoubleClick={() => { setIsEditing(id) }}>
          {title}
          </label>
      <button 
        className='destroy' 
        onClick={() => { removeTodo({ id }) }}
        aria-label={`Delete ${title}`}
      >
        <svg
          height="16"
          strokeLinejoin="round"
          viewBox="0 0 16 16"
          width="16"
          style={{ color: '#666' }}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.4697 13.5303L13 14.0607L14.0607 13L13.5303 12.4697L9.06065 7.99999L13.5303 3.53032L14.0607 2.99999L13 1.93933L12.4697 2.46966L7.99999 6.93933L3.53032 2.46966L2.99999 1.93933L1.93933 2.99999L2.46966 3.53032L6.93933 7.99999L2.46966 12.4697L1.93933 13L2.99999 14.0607L3.53032 13.5303L7.99999 9.06065L12.4697 13.5303Z"
            fill="currentColor">
          </path>
        </svg>
      </button>
      <input
        className='edit'
        value={editedTitle}
        onChange={(e) => { setEditedTitle(e.target.value) }}
        onKeyDown={handleKeyDown}
        onBlur={() => { setIsEditing('') }}
        ref={inputEditTitle}
      />
    </div>
  )
}