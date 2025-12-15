import type { Todo as TodoType, FilterValue } from '../types'
import { TODO_FILTERS } from '../consts'
import './Todos.css'
import { Todo } from './Todo'
import { useState } from 'react'
import { motion, AnimatePresence } from "motion/react"

interface Props {
  todos: TodoType[]
  setCompleted: (params: Pick<TodoType, 'id' | 'completed'>) => void
  setTitle: (params: Omit<TodoType, 'completed'>) => void
  removeTodo: (params: Pick<TodoType, 'id'>) => void  
  filterSelected: FilterValue
}

const EMPTY_MESSAGES = {
  [TODO_FILTERS.ALL]: 'No tasks yet. Add one above',
  [TODO_FILTERS.ACTIVE]: 'No active tasks. Time to relax',
  [TODO_FILTERS.COMPLETED]: 'No completed tasks yet. Keep going'
}

export const Todos: React.FC<Props> = ({ 
  todos, 
  setCompleted, 
  setTitle, 
  removeTodo,
  filterSelected 
}) => {
  const [isEditing, setIsEditing] = useState('')
  
  if (todos.length === 0) {
    return <motion.div 
    className="empty-state-container"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.15 }}
    >
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="empty-state-icon">
        <path d="M15.5234 2.59082L22.0791 3.80469L23.5029 4.06836C23.8503 4.13282 24.1582 4.33275 24.3584 4.62402L29.0742 11.4824C29.2745 11.7738 29.3505 12.1328 29.2861 12.4805L29.0225 13.9043L27.3232 23.0811C26.9881 24.8912 25.2495 26.0869 23.4395 25.752L20.0645 25.127L19.9697 23.0762L23.8027 23.7861C24.5267 23.9201 25.2222 23.4416 25.3564 22.7178L27.0566 13.54L22.4678 12.6904L20.501 12.3262L20.8652 10.3594L21.7148 5.77148L15.1592 4.55762L14.1426 10.043L12.9844 8.97852L12.2959 9.03809L13.1934 4.19336L13.5576 2.22656L15.5234 2.59082ZM22.832 10.7236L26.6055 11.4229L23.5303 6.9502L22.832 10.7236Z" fill="currentColor"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M21.5729 25.1981L20.9002 15.889L20.7958 14.445C20.7703 14.0923 20.6058 13.7642 20.3383 13.5329L14.0438 8.08675C13.7765 7.85536 13.4281 7.73971 13.0754 7.76519L11.6314 7.86953L4.9821 8.35005L2.9873 8.4942L3.13145 10.489L4.28469 26.4474C4.41738 28.2835 6.01345 29.6645 7.84961 29.5318L18.4885 28.763C20.3247 28.6302 21.7057 27.0342 21.5729 25.1981ZM19.5781 25.3422L18.9054 16.0331L14.2509 16.3695L12.2561 16.5137L12.1119 14.5189L11.7756 9.86433L5.12625 10.3449L6.27949 26.3033C6.33257 27.0377 6.971 27.5901 7.70546 27.537L18.3443 26.7682C19.0789 26.7151 19.6313 26.0767 19.5781 25.3422ZM14.1067 14.3747L13.8301 10.5465L17.935 14.0981L14.1067 14.3747ZM8.29529 14.7955L7.46412 14.8555L7.58425 16.5179L8.41541 16.4578L9.5724 16.3742L10.4036 16.3142L10.2834 14.6518L9.45226 14.7119L8.29529 14.7955ZM7.75237 18.8443L8.58353 18.7842L16.3898 18.2202L17.221 18.1601L17.3411 19.8225L16.5099 19.8825L8.70366 20.4466L7.8725 20.5066L7.75237 18.8443ZM8.87185 22.7738L8.04068 22.8339L8.16081 24.4962L8.99197 24.4362L16.7983 23.8721L17.6294 23.8119L17.5093 22.1497L16.6782 22.2097L8.87185 22.7738Z" fill="currentColor"/>
      </svg>


      <p className="empty-state-text">{EMPTY_MESSAGES[filterSelected]}</p>
    </motion.div>
  }

  return (
    <AnimatePresence> 
    <motion.ul 
      className="todos"
      initial="hidden"
      animate="visible"
      variants={{
      visible: {
        transition: {
          staggerChildren: 0.05
        }
      }
    }}
    >

      {todos.map((todo) => (
        <motion.li 
          key={todo.id}
          className={`
            ${todo.completed ? 'completed' : ''}
            ${isEditing === todo.id ? 'editing' : ''}
          `}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 }
          }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
          transition={{ duration: 0.15}}
          layout
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
        </motion.li>
      ))}

    </motion.ul>
    </AnimatePresence>
  )
}