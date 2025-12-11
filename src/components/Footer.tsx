import './Footer.css'
import { motion } from "motion/react"

interface Props {
  activeCount: number
  completedCount: number
}

export const Footer: React.FC<Props> = ({
  activeCount = 0,
  completedCount = 0
  }) => {
  const totalCount = activeCount + completedCount
  return (
    <motion.footer 
      className="footer"
      layout
      transition={{ duration: 0.1 }}
    >
        <div>
          <strong>{totalCount}</strong> items
        </div>
        ·
        <div>
          <strong>{completedCount}</strong> completed
        </div>
    </motion.footer>
  )
}