import './App.css'
import { useState, useEffect } from 'react'
import { Todos } from './components/Todos'
import { Header } from './components/Header'
import { type TodoId, type Todo as TodoType, type FilterValue, type TodoTitle } from './types'
import { Toolbar } from './components/Toolbar'
import { TODO_FILTERS } from './consts'
import { Footer } from './components/Footer'
import { Login } from './components/Login'
import { useAuth } from './hooks/useAuth'
import { fetchUserTodos, saveTodo, deleteTodo } from './services/firestore'
import Lottie from 'lottie-react'
import loaderAnimation from './assets/Lottie-logo-dark.json'
import { LayoutGroup } from 'motion/react'

const App = () => {
  const { user, loading: authLoading, signInWithGoogle, signOut } = useAuth()
  const [todos, setTodos] = useState<TodoType[]>([])
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Cargar todos cuando el usuario cambia
  useEffect(() => {
    if (!user) {
      setTodos([])
      setLoading(false)
      return
    }

    setLoading(true)
    fetchUserTodos(user.uid)
      .then(setTodos)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [user])

  const handleRemove = async ({ id }: TodoId): Promise<void> => {
    if (!user) return
    
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
    
    try {
      await deleteTodo(user.uid, id)
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const handleCompletedTodo = async (
    { id, completed }: Pick<TodoType, 'id' | 'completed'>
  ): Promise<void> => {
    if (!user) return

    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed,
          completedAt: completed ? Date.now() : undefined}
      }
      return todo
    })
    setTodos(newTodos)

    const todoToUpdate = newTodos.find(t => t.id === id)
    if (todoToUpdate) {
      setSaving(true)
      try {
        await saveTodo(user.uid, todoToUpdate)
      } catch (error) {
        console.error('Error updating todo:', error)
      } finally {
        setSaving(false)
      }
    }
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const handleRemoveAllCompleted = async (): Promise<void> => {
    if (!user) return

    const completedTodos = todos.filter(todo => todo.completed)
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)

    try {
      for (const todo of completedTodos) {
        await deleteTodo(user.uid, todo.id)
      }
    } catch (error) {
      console.error('Error deleting completed todos:', error)
    }
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return true
  })
  .sort((a, b) => {
    if (a.completed && !b.completed) return 1
    if (!a.completed && b.completed) return -1
    
    if (a.completed && b.completed) {
      return (b.completedAt || 0) - (a.completedAt || 0)
    }
    
    return (b.createdAt || 0) - (a.createdAt || 0)
  })

  const handleAddTodo = async ({ title }: TodoTitle): Promise<void> => {
    if (!user) return

    const newTodo: TodoType = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: Date.now()
    }
    setTodos(prevTodos => [newTodo, ...prevTodos])

    setSaving(true)
    try {
      await saveTodo(user.uid, newTodo)
    } catch (error) {
      console.error('Error saving todo:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleUpdateTitle = async ({ id, title }: { id: string, title: string }): Promise<void> => {
    if (!user) return

    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title }
      }
      return todo
    })
    setTodos(newTodos)

    const todoToUpdate = newTodos.find(t => t.id === id)
    if (todoToUpdate) {
      setSaving(true)
      try {
        await saveTodo(user.uid, todoToUpdate)
      } catch (error) {
        console.error('Error updating todo:', error)
      } finally {
        setSaving(false)
      }
    }
  }

  // Mostrar loader mientras verifica auth
  if (authLoading) {
    return (
      <main className="app">
        <div className='loading-container'>
          <Lottie 
            animationData={loaderAnimation} 
            loop={true}
            className='loading-animation'
          />
        </div>
      </main>
    )
  }

  // Mostrar login si no hay usuario
  if (!user) {
    return <Login onSignIn={signInWithGoogle} />
  }

  // Mostrar loader mientras carga los todos
  if (loading) {
    return (
      <main className="app">
        <div className='loading-container'>
          <Lottie 
            animationData={loaderAnimation} 
            loop={true}
            className='loading-animation'
          />
          <p className='loading'>Reading your list...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="app">
      {saving && <span className="saving-indicator">Saving task...</span>}
      
      {/* User info + Sign out */}
      <div className="user-info">
        <img 
          src={user.photoURL || ''} 
          alt={user.displayName || 'User'} 
          className="user-avatar"
          referrerPolicy="no-referrer"
        />
        <span className="user-name">{user.displayName}</span>
        <button onClick={signOut} className="sign-out-button">
          Log Out
          <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.5 13.5H6.75V15H2C1.44772 15 1 14.5523 1 14V2C1 1.44771 1.44772 1 2 1H6.75V2.5L2.5 2.5L2.5 13.5ZM12.4393 7.24999L10.4697 5.28031L9.93934 4.74998L11 3.68932L11.5303 4.21965L14.6036 7.29288C14.9941 7.6834 14.9941 8.31657 14.6036 8.70709L11.5303 11.7803L11 12.3106L9.93934 11.25L10.4697 10.7197L12.4393 8.74999L5.75 8.74999H5V7.24999H5.75L12.4393 7.24999Z" fill="#666"/>
          </svg>
        </button>
      </div>

      <Header onAddTodo={handleAddTodo} />
      <Toolbar
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
      />
      <LayoutGroup>
        <Todos 
          todos={filteredTodos} 
          removeTodo={handleRemove} 
          setCompleted={handleCompletedTodo} 
          setTitle={handleUpdateTitle}
          filterSelected={filterSelected}
        />
        <Footer
          activeCount={activeCount}
          completedCount={completedCount}
        />
      </LayoutGroup>
    </main>
  )
}

export default App
