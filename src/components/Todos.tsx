import type { Todo as TodoType } from '../types'
import './Todos.css'
import { Todo } from './Todo'
import { useState } from 'react'

interface Props {
  todos: TodoType[]
  setCompleted: (params: Pick<TodoType, 'id' | 'completed'>) => void
  setTitle: (params: Omit<TodoType, 'completed'>) => void
  removeTodo: (params: Pick<TodoType, 'id'>) => void  
}

export const Todos: React.FC<Props> = ({ 
  todos, 
  setCompleted, 
  setTitle, 
  removeTodo 
}) => {
  const [isEditing, setIsEditing] = useState('')
  
  return (
    <ul className="todos">
      {todos.map((todo) => (
        <li 
        key={todo.id}
        className={`
          ${todo.completed ? 'completed' : ''}
          ${isEditing === todo.id ? 'editing' : ''}
        `}
        onDoubleClick={() => { setIsEditing(todo.id) }}
        >
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            setCompleted={setCompleted}
            setTitle={setTitle}
            removeTodo={removeTodo}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
          <hr />
        </li>
      ))}
    </ul>
  )
}