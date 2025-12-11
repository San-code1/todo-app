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
    transition={{ duration: 0.1 }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M20.4928 17.3111L21.7672 10.4281L21.9649 9.3605C22.0132 9.09973 21.9559 8.83043 21.8057 8.61189L18.2689 3.46778C18.1187 3.24923 17.8877 3.09932 17.627 3.05104L16.5593 2.85335L11.6429 1.94302L10.168 1.66992L9.89485 3.14485L7.71006 14.9443C7.45868 16.3019 8.35547 17.6063 9.71311 17.8577L17.5794 19.3142C18.937 19.5656 20.2414 18.6688 20.4928 17.3111ZM19.0178 17.038L20.2923 10.155L16.8508 9.51781L15.3759 9.24471L15.649 7.76978L16.2862 4.32828L11.3698 3.41795L9.18499 15.2174C9.08443 15.7605 9.44316 16.2822 9.98621 16.3827L17.8525 17.8393C18.3956 17.9398 18.9173 17.5811 19.0178 17.038ZM17.1239 8.04288L17.648 5.21232L19.9545 8.567L17.1239 8.04288Z" fill="#666"/>
        <path d="M9.73801 6.73438L3.1618 7.31055L4.54627 20.9821L15.1028 20.0015L14.699 11.2909L9.73801 6.73438Z" fill="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M16.1796 18.899L15.6751 11.9172L15.5968 10.8342C15.5777 10.5697 15.4543 10.3236 15.2537 10.1501L10.5328 6.0655C10.3323 5.89196 10.071 5.80522 9.80648 5.82433L8.72351 5.90259L3.73652 6.26298L2.24042 6.37109L2.34853 7.86719L3.21346 19.836C3.31298 21.2131 4.51003 22.2488 5.88715 22.1493L13.8663 21.5727C15.2435 21.4731 16.2792 20.2761 16.1796 18.899ZM14.6835 19.0071L14.179 12.0253L10.6881 12.2776L9.19201 12.3857L9.0839 10.8896L8.83163 7.39869L3.84463 7.75908L4.70956 19.7279C4.74937 20.2787 5.22819 20.693 5.77904 20.6532L13.7582 20.0766C14.3091 20.0368 14.7234 19.558 14.6835 19.0071ZM10.58 10.7815L10.3725 7.91028L13.4512 10.574L10.58 10.7815ZM6.22141 11.0971L5.59803 11.1421L5.68813 12.3889L6.3115 12.3438L7.17924 12.2811L7.80262 12.2361L7.71252 10.9893L7.08914 11.0344L6.22141 11.0971ZM5.81422 14.1337L6.43759 14.0886L12.2923 13.6656L12.9157 13.6205L13.0058 14.8673L12.3824 14.9123L6.52769 15.3354L5.90432 15.3804L5.81422 14.1337ZM6.65383 17.0808L6.03045 17.1259L6.12055 18.3726L6.74392 18.3276L12.5987 17.9045L13.222 17.8594L13.1319 16.6127L12.5086 16.6577L6.65383 17.0808Z" fill="#666"/>
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