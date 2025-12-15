import { type TodoTitle } from '../types'
import { CreateTodo } from './CreateTodo'
import { useState, useEffect, useRef } from 'react'

import './Header.css'

interface Props {
  listName?: string
  listCreatedAt?: number
  onRenameList?: (newName: string) => void
  onAddTodo: ({ title }: TodoTitle) => void
  autoFocus?: boolean 
}

export const Header: React.FC<Props> = ({listName, listCreatedAt, onRenameList, onAddTodo, autoFocus}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(listName || 'Your list')
  const hasAutoEditedRef = useRef(false)

  // Sync when listName changes
  useEffect(() => {
    setEditedName(listName || 'Your list')
    
    // Check if the list is new (created less than 3 seconds ago)
    const isNewList = listCreatedAt ? (Date.now() - listCreatedAt) < 3000 : false
    
    // Enable editing only if it's a new list named "Untitled"
    if (listName === 'Untitled' && onRenameList && isNewList && !hasAutoEditedRef.current) {
      setIsEditing(true)
      hasAutoEditedRef.current = true
    }
    
    // Reset the flag when switching lists
    if (listName !== 'Untitled') {
      hasAutoEditedRef.current = false
    }
  }, [listName, listCreatedAt, onRenameList])

  const handleSave = () => {
    const trimmedName = editedName.trim()
    
    // If empty or only spaces, revert to original name
    if (!trimmedName) {
      setEditedName(listName || 'Your list')
    } else if (trimmedName !== listName && onRenameList) {
      // Only call onRenameList if the name changed
      onRenameList(trimmedName)
    }
    
    setIsEditing(false)
    hasAutoEditedRef.current = true // Mark as manually edited
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Check if focus goes to the tasks input (relatedTarget)
    const relatedTarget = e.relatedTarget as HTMLElement
    
    // If focus goes to another input or textarea within the header, save immediately
    if (relatedTarget?.tagName === 'INPUT' || relatedTarget?.tagName === 'TEXTAREA') {
      handleSave()
    } else {
      // For other cases, use a small delay
      setTimeout(() => {
        handleSave()
      }, 0)
    }
  }

  return (
    <header className='header'>
      {isEditing ? (
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave()
            if (e.key === 'Escape') {
              setEditedName(listName || 'Your list')
              setIsEditing(false)
            }
          }}
          onBlur={handleBlur}
          autoFocus
          className="list-title-input"
        />
      ) : (
        <div className="title-container" onClick={() => onRenameList && setIsEditing(true)}>
          <h1 className={onRenameList ? 'editable' : ''}>
            {listName || 'Your list'}
          </h1>
          {onRenameList && (
            <svg className="edit-icon-hover" height="12" strokeLinejoin="round" viewBox="0 0 16 16" width="12">
              <path fillRule="evenodd" clipRule="evenodd" d="M11.75 0.189331L12.2803 0.719661L15.2803 3.71966L15.8107 4.24999L15.2803 4.78032L5.15901 14.9016C4.45575 15.6049 3.50192 16 2.50736 16H0.75H0V15.25V13.4926C0 12.4981 0.395088 11.5442 1.09835 10.841L11.2197 0.719661L11.75 0.189331ZM11.75 2.31065L9.81066 4.24999L11.75 6.18933L13.6893 4.24999L11.75 2.31065ZM2.15901 11.9016L8.75 5.31065L10.6893 7.24999L4.09835 13.841C3.67639 14.2629 3.1041 14.5 2.50736 14.5H1.5V13.4926C1.5 12.8959 1.73705 12.3236 2.15901 11.9016ZM9 16H16V14.5H9V16Z" fill="currentColor" />
            </svg>
          )}
        </div>
      )}
      <CreateTodo saveTodo={onAddTodo} autoFocus={autoFocus}/>
    </header>
  )
}