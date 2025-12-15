import './Footer.css'
import { motion } from "motion/react"
import { ThemeSwitcher } from './ThemeSwitcher'

interface Props {
  activeCount?: number
  completedCount?: number
  listCount?: number
  mode?: 'tasks' | 'lists'
  theme: 'light' | 'dark' | 'system'
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void
}

export const Footer: React.FC<Props> = ({
  activeCount = 0,
  completedCount = 0,
  listCount = 0,
  mode = 'tasks',
  theme,
  onThemeChange
}) => {
  const totalCount = activeCount + completedCount

  return (
    <motion.footer 
      className="footer"
      layout
      transition={{ duration: 0.1 }}
    >
      <div className="footer-counts">
        {mode === 'tasks' ? (
          <>
            <div>
              <strong>{totalCount}</strong> items
            </div>
            ·
            <div>
              <strong>{completedCount}</strong> completed
            </div>
          </>
        ) : (
          <div>
            <strong>{listCount}</strong> {listCount === 1 ? 'list' : 'lists'}
          </div>
        )}
      </div>
      <ThemeSwitcher theme={theme} onThemeChange={onThemeChange} />
    </motion.footer>
  )
}