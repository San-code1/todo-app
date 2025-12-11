import './App.css'
import { useState, useEffect } from 'react'
import { Todos } from './components/Todos'
import { Header } from './components/Header'
import { type TodoId, type Todo as TodoType, type FilterValue, type TodoTitle } from './types'
import { Toolbar } from './components/Toolbar'
import { TODO_FILTERS } from './consts'
import { Footer } from './components/Footer'
import { fetchTodos, saveTodos } from './services/jsonbin'
import Lottie from 'lottie-react'
import loaderAnimation from './assets/Lottie-logo-dark.json'
import { LayoutGroup } from 'motion/react'

const App = () => {
  const [todos, setTodos] = useState<TodoType[]>([])
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Cargar todos al iniciar
  useEffect(() => {
    fetchTodos()
      .then(setTodos)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  // Guardar todos cuando cambien (con debounce simple)
  useEffect(() => {
    if (loading) return  // No guardar mientras carga inicial
    
    setSaving(true)
    const timeoutId = setTimeout(() => {
      saveTodos(todos)
        .catch(console.error)
        .finally(() => setSaving(false))
    }, 500)  // Espera 500ms antes de guardar

    return () => clearTimeout(timeoutId)
  }, [todos, loading])

  const handleRemove = ({id}: TodoId): void => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompletedTodo = (
    {id, completed}: Pick<TodoType, 'id' | 'completed'>
  ): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return true
  })

  const handleAddTodo = ({ title }: TodoTitle): void => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false
    }
    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }

  const handleUpdateTitle = ({ id, title }: { id: string, title: string }): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title
        }
      }

      return todo
    })

    setTodos(newTodos)
  }

  if (loading) {
    return <main className="app">
      <div className='loading-container'>
        <Lottie 
            animationData={loaderAnimation} 
            loop={true}
            className='loading-animation'
          />
          <p className='loading'>Reading your list...</p>
        </div>
      </main>
  }

  return (
    <main className="app">
      {saving && <span className="saving-indicator">Saving task...</span>}
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
