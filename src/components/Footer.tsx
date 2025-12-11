import './Footer.css'

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
    <footer className="footer">
        <div>
          <strong>{totalCount}</strong> items
        </div>
        ·
        <div>
          <strong>{completedCount}</strong> completed
        </div>
    </footer>
  )
}