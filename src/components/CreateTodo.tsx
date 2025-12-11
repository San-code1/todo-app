import { type TodoTitle } from '../types'
import { useState } from 'react'

import './CreateTodo.css'

interface Props {
  saveTodo: ({ title }: TodoTitle) => void
}

export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    saveTodo({ title: inputValue })
    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
      <svg
          className="input-icon left"
          height="16"
          viewBox="0 0 16 16"
          width="16"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.75 1H7.25V7.25H1.5V8.75H7.25V15H8.75V8.75H14.5V7.25H8.75V1Z"
            fill="currentColor"
          />
        </svg>        
        <input 
          className="new-todo"
          type="text" 
          placeholder="Add a new todo" 
          value={inputValue}
          onChange={(event) => { setInputValue(event.target.value) }}
          autoFocus
        />
        <svg
          className="input-icon right"
          height="16"
          viewBox="0 0 16 16"
          width="16"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.5 3V2.25H15V3V10C15 10.5523 14.5523 11 14 11H3.56068L5.53035 12.9697L6.06068 13.5L5.00002 14.5607L4.46969 14.0303L1.39647 10.9571C1.00595 10.5666 1.00595 9.93342 1.39647 9.54289L4.46969 6.46967L5.00002 5.93934L6.06068 7L5.53035 7.53033L3.56068 9.5H13.5V3Z"
            fill="currentColor"
          />
        </svg>      </div>
    </form>
  )
}