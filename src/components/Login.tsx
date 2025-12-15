import './Login.css'

import { Todos } from './Todos'
import { Header } from './Header'
import { TODO_FILTERS } from '../consts'
import { motion } from 'motion/react'

const MOCK_TODOS_ALL = [
  { id: '1', title: 'Design homepage', completed: false, createdAt: Date.now() },
  { id: '2', title: 'Review code', completed: false, createdAt: Date.now() - 1000 },
  { id: '3', title: 'Team meeting', completed: true, createdAt: Date.now() - 2000 },
]

const MOCK_TODOS_ACTIVE = [
  { id: '1', title: 'Buy groceries', completed: false, createdAt: Date.now() },
  { id: '2', title: 'Call dentist', completed: false, createdAt: Date.now() - 1000 },
  { id: '3', title: 'Update docs', completed: false, createdAt: Date.now() - 2000 },
  { id: '4', title: 'Plan weekend', completed: false, createdAt: Date.now() - 3000 },
]

interface Props {
  onSignIn: () => void
  onContinueAsGuest: () => void 
}

export const Login: React.FC<Props> = ({ onSignIn, onContinueAsGuest }) => {
  return (
    <div className="login-container">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-icon">
        <path d="M15.5234 2.59082L22.0791 3.80469L23.5029 4.06836C23.8503 4.13282 24.1582 4.33275 24.3584 4.62402L29.0742 11.4824C29.2745 11.7738 29.3505 12.1328 29.2861 12.4805L29.0225 13.9043L27.3232 23.0811C26.9881 24.8912 25.2495 26.0869 23.4395 25.752L20.0645 25.127L19.9697 23.0762L23.8027 23.7861C24.5267 23.9201 25.2222 23.4416 25.3564 22.7178L27.0566 13.54L22.4678 12.6904L20.501 12.3262L20.8652 10.3594L21.7148 5.77148L15.1592 4.55762L14.1426 10.043L12.9844 8.97852L12.2959 9.03809L13.1934 4.19336L13.5576 2.22656L15.5234 2.59082ZM22.832 10.7236L26.6055 11.4229L23.5303 6.9502L22.832 10.7236Z" fill="currentColor"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M21.5729 25.1981L20.9002 15.889L20.7958 14.445C20.7703 14.0923 20.6058 13.7642 20.3383 13.5329L14.0438 8.08675C13.7765 7.85536 13.4281 7.73971 13.0754 7.76519L11.6314 7.86953L4.9821 8.35005L2.9873 8.4942L3.13145 10.489L4.28469 26.4474C4.41738 28.2835 6.01345 29.6645 7.84961 29.5318L18.4885 28.763C20.3247 28.6302 21.7057 27.0342 21.5729 25.1981ZM19.5781 25.3422L18.9054 16.0331L14.2509 16.3695L12.2561 16.5137L12.1119 14.5189L11.7756 9.86433L5.12625 10.3449L6.27949 26.3033C6.33257 27.0377 6.971 27.5901 7.70546 27.537L18.3443 26.7682C19.0789 26.7151 19.6313 26.0767 19.5781 25.3422ZM14.1067 14.3747L13.8301 10.5465L17.935 14.0981L14.1067 14.3747ZM8.29529 14.7955L7.46412 14.8555L7.58425 16.5179L8.41541 16.4578L9.5724 16.3742L10.4036 16.3142L10.2834 14.6518L9.45226 14.7119L8.29529 14.7955ZM7.75237 18.8443L8.58353 18.7842L16.3898 18.2202L17.221 18.1601L17.3411 19.8225L16.5099 19.8825L8.70366 20.4466L7.8725 20.5066L7.75237 18.8443ZM8.87185 22.7738L8.04068 22.8339L8.16081 24.4962L8.99197 24.4362L16.7983 23.8721L17.6294 23.8119L17.5093 22.1497L16.6782 22.2097L8.87185 22.7738Z" fill="currentColor"/>
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
            <path fillRule="evenodd" clipRule="evenodd" d="M7.75 0C5.95507 0 4.5 1.45507 4.5 3.25V3.75C4.5 5.54493 5.95507 7 7.75 7H8.25C10.0449 7 11.5 5.54493 11.5 3.75V3.25C11.5 1.45507 10.0449 0 8.25 0H7.75ZM6 3.25C6 2.2835 6.7835 1.5 7.75 1.5H8.25C9.2165 1.5 10 2.2835 10 3.25V3.75C10 4.7165 9.2165 5.5 8.25 5.5H7.75C6.7835 5.5 6 4.7165 6 3.75V3.25ZM2.5 14.5V13.1709C3.31958 11.5377 4.99308 10.5 6.82945 10.5H9.17055C11.0069 10.5 12.6804 11.5377 13.5 13.1709V14.5H2.5ZM6.82945 9C4.35483 9 2.10604 10.4388 1.06903 12.6857L1 12.8353V13V15.25V16H1.75H14.25H15V15.25V13V12.8353L14.931 12.6857C13.894 10.4388 11.6452 9 9.17055 9H6.82945Z" fill="currentColor" />
          </svg>
          Continue without account
        </button>
      </div>
      <div className="guest-note-container">
        <svg height="12" strokeLinejoin="round" viewBox="0 0 16 16" width="12" className="guest-note-icon">
          <path fillRule="evenodd" clipRule="evenodd" d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM6.25 7H7H7.74999C8.30227 7 8.74999 7.44772 8.74999 8V11.5V12.25H7.24999V11.5V8.5H7H6.25V7ZM8 6C8.55229 6 9 5.55228 9 5C9 4.44772 8.55229 4 8 4C7.44772 4 7 4.44772 7 5C7 5.55228 7.44772 6 8 6Z" fill="currentColor" />
        </svg>
        <p className="guest-note">
          Guest mode saves locally. Sign in to sync across devices.
        </p>
      </div>
      <div className="preview-container-wrapper">
        {/* Left list - All tasks */}
        <motion.div 
          className="preview-container"
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.1, ease: 'easeOut' }}
        >
          <div className="app-mockup">
            <Header 
              autoFocus={false} 
              onAddTodo={() => {}}/>
            <Todos 
              todos={MOCK_TODOS_ALL}
              setCompleted={() => {}}
              setTitle={() => {}}
              removeTodo={() => {}}
              filterSelected={TODO_FILTERS.ALL}
            />
          </div>
        </motion.div>

        {/* Center list - Active tasks (larger) */}
        <motion.div 
          className="preview-container preview-center"
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.1, ease: 'easeOut' }}
        >
          <div className="app-mockup">
            <Header 
              autoFocus={false} 
              onAddTodo={() => {}}/>
            <Todos 
              todos={MOCK_TODOS_ACTIVE}
              setCompleted={() => {}}
              setTitle={() => {}}
              removeTodo={() => {}}
              filterSelected={TODO_FILTERS.ACTIVE}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}