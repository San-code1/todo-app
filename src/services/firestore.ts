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
import { type Todo, type TodoList } from '../types'

// ========== LISTS ==========
export const fetchUserLists = async (userId: string): Promise<TodoList[]> => {
  const listsRef = collection(db, 'users', userId, 'lists')
  const q = query(listsRef, orderBy('createdAt', 'asc'))
  const snapshot = await getDocs(q)
  
  const lists = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as TodoList[]

  // If no lists exist, create a default one
  if (lists.length === 0) {
    const defaultList: TodoList = {
      id: 'default',
      name: 'My Tasks',
      createdAt: Date.now()
    }
    await saveList(userId, defaultList)
    return [defaultList]
  }

  return lists
}

export const saveList = async (userId: string, list: TodoList): Promise<void> => {
  const listRef = doc(db, 'users', userId, 'lists', list.id)
  await setDoc(listRef, {
    name: list.name,
    icon: list.icon || null,
    createdAt: list.createdAt
  })
}

export const deleteList = async (userId: string, listId: string): Promise<void> => {
  const listRef = doc(db, 'users', userId, 'lists', listId)
  await deleteDoc(listRef)
  
  // Also delete all todos from that list
  const todosRef = collection(db, 'users', userId, 'lists', listId, 'todos')
  const todosSnapshot = await getDocs(todosRef)
  const deletePromises = todosSnapshot.docs.map(doc => deleteDoc(doc.ref))
  await Promise.all(deletePromises)
}

// ========== TODOS (now inside a list) ==========
export const fetchListTodos = async (userId: string, listId: string): Promise<Todo[]> => {
  const todosRef = collection(db, 'users', userId, 'lists', listId, 'todos')
  const q = query(todosRef, orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Todo[]
}

export const saveTodo = async (userId: string, listId: string, todo: Todo): Promise<void> => {
  const todoRef = doc(db, 'users', userId, 'lists', listId, 'todos', todo.id)
  await setDoc(todoRef, {
    title: todo.title,
    completed: todo.completed,
    createdAt: todo.createdAt || Date.now(),
    completedAt: todo.completedAt || null 
  })
}

export const deleteTodo = async (userId: string, listId: string, todoId: string): Promise<void> => {
  const todoRef = doc(db, 'users', userId, 'lists', listId, 'todos', todoId)
  await deleteDoc(todoRef)
}