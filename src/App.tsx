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
import { loadTodosFromStorage, saveTodosToStorage } from './services/localstorage'
import { useTheme } from './hooks/useTheme'

type UserMode = 'authenticated' | 'guest' | null

const App = () => {
  const { user, loading: authLoading, signInWithGoogle, signOut } = useAuth()
  const { theme, changeTheme } = useTheme()
  const [userMode, setUserMode] = useState<UserMode>(null)
  const [todos, setTodos] = useState<TodoType[]>([])
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const isGuest = userMode === 'guest'
  const isAuthenticated = user !== null

  // Detectar cuando el usuario se autentica desde modo guest
  useEffect(() => {
    if (user && userMode === 'guest') {
      // Usuario se autenticó desde guest mode
      // Migrar datos de localStorage a Firebase
      const guestTodos = loadTodosFromStorage()
      
      if (guestTodos.length > 0) {
        // Guardar las tareas del guest en Firebase
        setSaving(true)
        Promise.all(
          guestTodos.map(todo => saveTodo(user.uid, todo))
        )
          .then(() => {
            console.log('Guest todos migrated to Firebase')
            // Limpiar localStorage después de migrar
            saveTodosToStorage([])
          })
          .catch(error => {
            console.error('Error migrating guest todos:', error)
          })
          .finally(() => {
            setSaving(false)
          })
      }
      
      setUserMode('authenticated')
    } else if (!user && userMode === 'authenticated') {
      // Usuario cerró sesión
      setUserMode(null)
    }
  }, [user, userMode])

  // Cargar todos según el modo
  useEffect(() => {
    if (isAuthenticated && user) {
      // Modo autenticado - cargar de Firebase
      setLoading(true)
      fetchUserTodos(user.uid)
        .then(setTodos)
        .catch(console.error)
        .finally(() => setLoading(false))
    } else if (isGuest) {
      // Modo guest - cargar de localStorage
      const localTodos = loadTodosFromStorage()
      setTodos(localTodos)
      setLoading(false)
    }
  }, [user, userMode, isAuthenticated, isGuest])


  const handleContinueAsGuest = () => {
    setUserMode('guest')
  }

  const handleRemove = async ({ id }: TodoId): Promise<void> => {
    if (!user && !isGuest) return
    
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
    
    if (isGuest) {
      // Guardar en localStorage
      saveTodosToStorage(newTodos)
    } else if (user) {
      // Guardar en Firebase
      try {
        await deleteTodo(user.uid, id)
      } catch (error) {
        console.error('Error deleting todo:', error)
      }
    }
  }

  const handleCompletedTodo = async (
    { id, completed }: Pick<TodoType, 'id' | 'completed'>
  ): Promise<void> => {
    if (!user && !isGuest) return

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

    if (isGuest) {
      // Guardar en localStorage
      saveTodosToStorage(newTodos)
    } else if (user) {
      // Guardar en Firebase
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
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const handleRemoveAllCompleted = async (): Promise<void> => {
    if (!user && !isGuest) return

    const completedTodos = todos.filter(todo => todo.completed)
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)

    if (isGuest) {
      // Guardar en localStorage
      saveTodosToStorage(newTodos)
    } else if (user) {
      // Guardar en Firebase
      try {
        for (const todo of completedTodos) {
          await deleteTodo(user.uid, todo.id)
        }
      } catch (error) {
        console.error('Error deleting completed todos:', error)
      }
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
    if (!user && !isGuest) return

    const newTodo: TodoType = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: Date.now()
    }
    
    const newTodos = [newTodo, ...todos]
    setTodos(newTodos)

    if (isGuest) {
      // Guardar en localStorage
      saveTodosToStorage(newTodos)
    } else if (user) {
      // Guardar en Firebase
      setSaving(true)
      try {
        await saveTodo(user.uid, newTodo)
      } catch (error) {
        console.error('Error saving todo:', error)
      } finally {
        setSaving(false)
      }
    }
  }

  const handleUpdateTitle = async ({ id, title }: { id: string, title: string }): Promise<void> => {
    if (!user && !isGuest) return

    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title }
      }
      return todo
    })
    setTodos(newTodos)

    if (isGuest) {
      // Guardar en localStorage
      saveTodosToStorage(newTodos)
    } else if (user) {
      // Guardar en Firebase
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
  if (!user && !isGuest) {
    return <Login 
      onSignIn={signInWithGoogle} 
      onContinueAsGuest={handleContinueAsGuest}
    />
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
      {isGuest ? (
        <div className="user-info guest-info">
          <div className="guest-info-container">
          <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.75 0C5.95507 0 4.5 1.45507 4.5 3.25V3.75C4.5 5.54493 5.95507 7 7.75 7H8.25C10.0449 7 11.5 5.54493 11.5 3.75V3.25C11.5 1.45507 10.0449 0 8.25 0H7.75ZM6 3.25C6 2.2835 6.7835 1.5 7.75 1.5H8.25C9.2165 1.5 10 2.2835 10 3.25V3.75C10 4.7165 9.2165 5.5 8.25 5.5H7.75C6.7835 5.5 6 4.7165 6 3.75V3.25ZM2.5 14.5V13.1709C3.31958 11.5377 4.99308 10.5 6.82945 10.5H9.17055C11.0069 10.5 12.6804 11.5377 13.5 13.1709V14.5H2.5ZM6.82945 9C4.35483 9 2.10604 10.4388 1.06903 12.6857L1 12.8353V13V15.25V16H1.75H14.25H15V15.25V13V12.8353L14.931 12.6857C13.894 10.4388 11.6452 9 9.17055 9H6.82945Z" fill="currentColor" />
          </svg>
          <span className="guest-badge"> Guest Mode</span>
          </div>
          <button onClick={signInWithGoogle} className="sign-in-button">
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in to sync
          </button>
        </div>
      ) : (
        <div className="user-info">
          <img 
            src={user?.photoURL || ''} 
            alt={user?.displayName || 'User'} 
            className="user-avatar"
            referrerPolicy="no-referrer"
          />
          <span className="user-name">{user?.displayName}</span>
          <button onClick={signOut} className="sign-out-button">
            Log Out
            <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
              <path fillRule="evenodd" clipRule="evenodd" d="M2.5 13.5H6.75V15H2C1.44772 15 1 14.5523 1 14V2C1 1.44771 1.44772 1 2 1H6.75V2.5L2.5 2.5L2.5 13.5ZM12.4393 7.24999L10.4697 5.28031L9.93934 4.74998L11 3.68932L11.5303 4.21965L14.6036 7.29288C14.9941 7.6834 14.9941 8.31657 14.6036 8.70709L11.5303 11.7803L11 12.3106L9.93934 11.25L10.4697 10.7197L12.4393 8.74999L5.75 8.74999H5V7.24999H5.75L12.4393 7.24999Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      )}

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
          theme={theme}
          onThemeChange={changeTheme}
        />
      </LayoutGroup>
    </main>
  )
}

export default App
