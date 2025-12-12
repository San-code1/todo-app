import { type TodoTitle } from '../types'
import { CreateTodo } from './CreateTodo'

import './Header.css'

interface Props {
  onAddTodo: ({ title }: TodoTitle) => void
  autoFocus?: boolean 
}

export const Header: React.FC<Props> = ({onAddTodo, autoFocus}) => {
  return (
    <header className='header'>
      <h1>Your list</h1>
      <CreateTodo saveTodo={onAddTodo} autoFocus={autoFocus}/>
    </header>
  )
}