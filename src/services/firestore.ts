import { 
    collection, 
    doc,
    getDocs, 
    setDoc,
    deleteDoc,
    query,
    orderBy
  } from 'firebase/firestore'
  import { db } from './firebase'
  import { type Todo } from '../types'
  
  // Obtener todos los todos de un usuario
  export const fetchUserTodos = async (userId: string): Promise<Todo[]> => {
    const todosRef = collection(db, 'users', userId, 'todos')
    const q = query(todosRef, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Todo[]
  }
  
  // Guardar/actualizar un todo
  export const saveTodo = async (userId: string, todo: Todo): Promise<void> => {
    const todoRef = doc(db, 'users', userId, 'todos', todo.id)
    await setDoc(todoRef, {
      title: todo.title,
      completed: todo.completed,
      createdAt: todo.createdAt || Date.now()
    })
  }
  
  // Eliminar un todo
  export const deleteTodo = async (userId: string, todoId: string): Promise<void> => {
    const todoRef = doc(db, 'users', userId, 'todos', todoId)
    await deleteDoc(todoRef)
  }
  
  // Guardar todos los todos (batch update)
  export const saveAllTodos = async (userId: string, todos: Todo[]): Promise<void> => {
    for (const todo of todos) {
      await saveTodo(userId, todo)
    }
  }