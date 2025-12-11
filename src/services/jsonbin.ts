import { type Todo } from '../types'

const BIN_ID = import.meta.env.VITE_JSONBIN_BIN_ID
const API_KEY = import.meta.env.VITE_JSONBIN_API_KEY

const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${BASE_URL}/latest`, {
    headers: {
      'X-Access-Key': API_KEY
    }
  })
  
  if (!response.ok) {
    throw new Error('Error al cargar los todos')
  }
  
  const data = await response.json()
  return data.record.todos ?? []
}

export const saveTodos = async (todos: Todo[]): Promise<void> => {
  const response = await fetch(BASE_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Key': API_KEY
    },
    body: JSON.stringify({ todos })
  })
  
  if (!response.ok) {
    throw new Error('Error al guardar los todos')
  }
}
