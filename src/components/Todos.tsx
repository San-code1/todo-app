import type { Todo as TodoType } from '../types'
import './Todos.css'
import { Todo } from './Todo'
import { useState } from 'react'
import { motion, AnimatePresence } from "motion/react"

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
          onDoubleClick={() => { setIsEditing(todo.id) }}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 }
          }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
          transition={{ duration: 0.1}}
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