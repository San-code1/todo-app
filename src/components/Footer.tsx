import './Footer.css'
import { motion } from "motion/react"
import { ThemeSwitcher } from './ThemeSwitcher'

interface Props {
  activeCount: number
  completedCount: number
  theme: 'light' | 'dark' | 'system'
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void
}

export const Footer: React.FC<Props> = ({
  activeCount = 0,
  completedCount = 0,
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
        <div>
          <strong>{totalCount}</strong> items
        </div>
        ·
        <div>
          <strong>{completedCount}</strong> completed
        </div>
      </div>
      <ThemeSwitcher theme={theme} onThemeChange={onThemeChange} />
    </motion.footer>
  )
}