import './Login.css'

import { Todos } from './Todos'
import { Header } from './Header'
import { TODO_FILTERS } from '../consts'
import { motion } from 'motion/react'

const MOCK_TODOS = [
  { id: '1', title: 'Buy groceries', completed: false, createdAt: Date.now() },
  { id: '2', title: 'Call dentist', completed: false, createdAt: Date.now() - 1000 },
  { id: '3', title: 'Finish project proposal', completed: true, createdAt: Date.now() - 2000 },
  { id: '4', title: 'Morning workout', completed: true, createdAt: Date.now() - 3000 },
]

interface Props {
  onSignIn: () => void
  onContinueAsGuest: () => void 
}

export const Login: React.FC<Props> = ({ onSignIn, onContinueAsGuest }) => {
  return (
    <div className="login-container">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M20.4928 17.3111L21.7672 10.4281L21.9649 9.3605C22.0132 9.09973 21.9559 8.83043 21.8057 8.61189L18.2689 3.46778C18.1187 3.24923 17.8877 3.09932 17.627 3.05104L16.5593 2.85335L11.6429 1.94302L10.168 1.66992L9.89485 3.14485L7.71006 14.9443C7.45868 16.3019 8.35547 17.6063 9.71311 17.8577L17.5794 19.3142C18.937 19.5656 20.2414 18.6688 20.4928 17.3111ZM19.0178 17.038L20.2923 10.155L16.8508 9.51781L15.3759 9.24471L15.649 7.76978L16.2862 4.32828L11.3698 3.41795L9.18499 15.2174C9.08443 15.7605 9.44316 16.2822 9.98621 16.3827L17.8525 17.8393C18.3956 17.9398 18.9173 17.5811 19.0178 17.038ZM17.1239 8.04288L17.648 5.21232L19.9545 8.567L17.1239 8.04288Z" fill="#666"/>
        <path d="M9.73801 6.73438L3.1618 7.31055L4.54627 20.9821L15.1028 20.0015L14.699 11.2909L9.73801 6.73438Z" fill="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M16.1796 18.899L15.6751 11.9172L15.5968 10.8342C15.5777 10.5697 15.4543 10.3236 15.2537 10.1501L10.5328 6.0655C10.3323 5.89196 10.071 5.80522 9.80648 5.82433L8.72351 5.90259L3.73652 6.26298L2.24042 6.37109L2.34853 7.86719L3.21346 19.836C3.31298 21.2131 4.51003 22.2488 5.88715 22.1493L13.8663 21.5727C15.2435 21.4731 16.2792 20.2761 16.1796 18.899ZM14.6835 19.0071L14.179 12.0253L10.6881 12.2776L9.19201 12.3857L9.0839 10.8896L8.83163 7.39869L3.84463 7.75908L4.70956 19.7279C4.74937 20.2787 5.22819 20.693 5.77904 20.6532L13.7582 20.0766C14.3091 20.0368 14.7234 19.558 14.6835 19.0071ZM10.58 10.7815L10.3725 7.91028L13.4512 10.574L10.58 10.7815ZM6.22141 11.0971L5.59803 11.1421L5.68813 12.3889L6.3115 12.3438L7.17924 12.2811L7.80262 12.2361L7.71252 10.9893L7.08914 11.0344L6.22141 11.0971ZM5.81422 14.1337L6.43759 14.0886L12.2923 13.6656L12.9157 13.6205L13.0058 14.8673L12.3824 14.9123L6.52769 15.3354L5.90432 15.3804L5.81422 14.1337ZM6.65383 17.0808L6.03045 17.1259L6.12055 18.3726L6.74392 18.3276L12.5987 17.9045L13.222 17.8594L13.1319 16.6127L12.5086 16.6577L6.65383 17.0808Z" fill="#666"/>
      </svg>
      <h1 className="login-title">Welcome to QuickTasks</h1>
      <p className="login-description">Get things done. The task manager that gets out of your way. Fast, elegant, and simple.</p>
      <div className="login-buttons">
        <button onClick={onSignIn} className="google-button">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>
        <span>or</span>
        <button onClick={onContinueAsGuest} className="guest-button">
          <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.75 0C5.95507 0 4.5 1.45507 4.5 3.25V3.75C4.5 5.54493 5.95507 7 7.75 7H8.25C10.0449 7 11.5 5.54493 11.5 3.75V3.25C11.5 1.45507 10.0449 0 8.25 0H7.75ZM6 3.25C6 2.2835 6.7835 1.5 7.75 1.5H8.25C9.2165 1.5 10 2.2835 10 3.25V3.75C10 4.7165 9.2165 5.5 8.25 5.5H7.75C6.7835 5.5 6 4.7165 6 3.75V3.25ZM2.5 14.5V13.1709C3.31958 11.5377 4.99308 10.5 6.82945 10.5H9.17055C11.0069 10.5 12.6804 11.5377 13.5 13.1709V14.5H2.5ZM6.82945 9C4.35483 9 2.10604 10.4388 1.06903 12.6857L1 12.8353V13V15.25V16H1.75H14.25H15V15.25V13V12.8353L14.931 12.6857C13.894 10.4388 11.6452 9 9.17055 9H6.82945Z" fill="#171717" />
          </svg>
          Continue without account
        </button>
      </div>
      <div className="guest-note-container">
        <svg height="12" strokeLinejoin="round" viewBox="0 0 16 16" width="12">
          <path fillRule="evenodd" clipRule="evenodd" d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM6.25 7H7H7.74999C8.30227 7 8.74999 7.44772 8.74999 8V11.5V12.25H7.24999V11.5V8.5H7H6.25V7ZM8 6C8.55229 6 9 5.55228 9 5C9 4.44772 8.55229 4 8 4C7.44772 4 7 4.44772 7 5C7 5.55228 7.44772 6 8 6Z" fill="#666" />
        </svg>
        <p className="guest-note">
          Guest mode saves locally. Sign in to sync across devices.
        </p>
      </div>

      <div className="preview-container">
        <motion.div className="app-mockup" 
          initial={{ opacity: 0, translateY: 10, filter: 'blur(10px)' }} 
          animate={{ opacity: 1, translateY: 0, filter: 'blur(0px)' }} 
          exit={{ opacity: 0, translateY: 10, filter: 'blur(10px)' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          >
          <Header 
            autoFocus={false} 
            onAddTodo={() => {}}/>
          <Todos 
            todos={MOCK_TODOS}
            setCompleted={() => {}}
            setTitle={() => {}}
            removeTodo={() => {}}
            filterSelected={TODO_FILTERS.ALL}
          />
        </motion.div>
        <div className="mockup-overlay">
        </div>
      </div>
    </div>
  )
}