import { type Todo, type TodoList } from '../types'

const TODOS_KEY = 'quicktasks_todos'
const LISTS_KEY = 'quicktasks_lists'
const ACTIVE_LIST_KEY = 'quicktasks_active_list'

// ========== LISTS ==========
export const loadListsFromStorage = (): TodoList[] => {
  try {
    const stored = localStorage.getItem(LISTS_KEY)
    const lists = stored ? JSON.parse(stored) : []
    
    // If no lists exist, create a default one
    if (lists.length === 0) {
      const defaultList: TodoList = {
        id: 'default',
        name: 'My Tasks',
        createdAt: Date.now()
      }
      saveListsToStorage([defaultList])
      return [defaultList]
    }
    
    return lists
  } catch (error) {
    console.error('Error loading lists from localStorage:', error)
    return []
  }
}

export const saveListsToStorage = (lists: TodoList[]): void => {
  try {
    localStorage.setItem(LISTS_KEY, JSON.stringify(lists))
  } catch (error) {
    console.error('Error saving lists to localStorage:', error)
  }
}

export const getActiveListId = (): string => {
  return localStorage.getItem(ACTIVE_LIST_KEY) || 'default'
}

export const setActiveListId = (listId: string): void => {
  localStorage.setItem(ACTIVE_LIST_KEY, listId)
}

// ========== TODOS (now organized by list) ==========
export const loadTodosFromStorage = (listId: string): Todo[] => {
  try {
    const stored = localStorage.getItem(TODOS_KEY)
    const allTodos = stored ? JSON.parse(stored) : {}
    return allTodos[listId] || []
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return []
  }
}

export const saveTodosToStorage = (listId: string, todos: Todo[]): void => {
  try {
    const stored = localStorage.getItem(TODOS_KEY)
    const allTodos = stored ? JSON.parse(stored) : {}
    allTodos[listId] = todos
    localStorage.setItem(TODOS_KEY, JSON.stringify(allTodos))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export const deleteListTodos = (listId: string): void => {
  try {
    const stored = localStorage.getItem(TODOS_KEY)
    const allTodos = stored ? JSON.parse(stored) : {}
    delete allTodos[listId]
    localStorage.setItem(TODOS_KEY, JSON.stringify(allTodos))
  } catch (error) {
    console.error('Error deleting list todos:', error)
  }
}

export const clearStoredTodos = (): void => {
  localStorage.removeItem(TODOS_KEY)
  localStorage.removeItem(LISTS_KEY)
  localStorage.removeItem(ACTIVE_LIST_KEY)
}