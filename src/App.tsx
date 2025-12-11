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
        return { ...todo, completed }
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
        <img src={user.photoURL || ''} alt={user.displayName || 'User'} className="user-avatar" />
        <span className="user-name">{user.displayName}</span>
        <button onClick={signOut} className="sign-out-button">Sign out</button>
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
