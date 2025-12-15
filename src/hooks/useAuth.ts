import { useState, useEffect } from 'react'
import { 
  type User,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth, googleProvider } from '../services/firebase'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      return result
    } catch (error) {
      const authError = error as { code?: string; message?: string }
      console.error('Error signing in:', authError.code, authError.message)
      
      // If the error is due to a blocked popup, show message to user
      if (authError.code === 'auth/popup-blocked') {
        alert('El popup fue bloqueado por el navegador. Por favor, permite popups para este sitio.')
      }
      
      throw error
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return {
    user,
    loading,
    signInWithGoogle,
    signOut
  }
}