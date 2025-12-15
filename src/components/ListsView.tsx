import './ListsView.css'
import { type TodoList } from '../types'
import { motion, AnimatePresence } from 'motion/react'

interface Props {
  lists: TodoList[]
  onSelectList: (listId: string) => void
  onCreateList: (name: string) => void
  onDeleteList: (listId: string) => void
  getTodoCount: (listId: string) => { total: number; completed: number }
}

export const ListsView: React.FC<Props> = ({
  lists,
  onSelectList,
  onCreateList,
  onDeleteList,
  getTodoCount
}) => {
  const handleCreateNew = () => {
    onCreateList('Untitled')
  }

  return (
    <div className="lists-view">
      <div className="lists-view-header">
        <h1 className="lists-title">Your lists</h1>
        <button 
          className="create-list-button" 
          onClick={handleCreateNew}
        >
          <svg
            className="create-list-button-icon"
            height="12"
            viewBox="0 0 16 16"
            width="12"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.75 1H7.25V7.25H1.5V8.75H7.25V15H8.75V8.75H14.5V7.25H8.75V1Z"
              fill="currentColor"
            />
          </svg>        
          New
        </button>
      </div>
      
      <div className="lists-grid">
        <AnimatePresence>
          {lists.map((list) => {
            const { total, completed } = getTodoCount(list.id)
            const active = total - completed
            
            return (
              <motion.div
                key={list.id}
                layout
                initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
                transition={{ duration: 0.1, ease: 'easeInOut' }}
                className={`list-card ${total > 0 ? 'has-content' : ''}`}
                onClick={() => onSelectList(list.id)}
              >
                {/* Paper protruding from the folder */}
                {total > 0 && <div className="folder-content"></div>}

                <div className="list-header">
                  <p className="list-name">{list.name}</p>
                </div>
                
                <div className="list-stats">
                  <span className="stat"><strong> {total} </strong> items</span>
                  {active > 0 && (
                    <>
                      <span className="stat-separator">·</span>
                      <span className="stat-active"><strong> {active} </strong> pending</span>
                    </>
                  )}
                </div>

                {lists.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteList(list.id)
                      }}
                      className="list-delete"
                    >
                      <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.75 2.75C6.75 2.05964 7.30964 1.5 8 1.5C8.69036 1.5 9.25 2.05964 9.25 2.75V3H6.75V2.75ZM5.25 3V2.75C5.25 1.23122 6.48122 0 8 0C9.51878 0 10.75 1.23122 10.75 2.75V3H12.9201H14.25H15V4.5H14.25H13.8846L13.1776 13.6917C13.0774 14.9942 11.9913 16 10.6849 16H5.31508C4.00874 16 2.92263 14.9942 2.82244 13.6917L2.11538 4.5H1.75H1V3H1.75H3.07988H5.25ZM4.31802 13.5767L3.61982 4.5H12.3802L11.682 13.5767C11.6419 14.0977 11.2075 14.5 10.6849 14.5H5.31508C4.79254 14.5 4.3581 14.0977 4.31802 13.5767Z" fill="currentColor" />
                      </svg>
                    </button>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}