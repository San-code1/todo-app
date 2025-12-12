import { type Todo } from '../types'

const STORAGE_KEY = 'quicktasks_todos'

export const loadTodosFromStorage = (): Todo[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return []
  }
}

export const saveTodosToStorage = (todos: Todo[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export const clearStoredTodos = (): void => {
  localStorage.removeItem(STORAGE_KEY)
}