import { Filters } from './Filters'
import { type FilterValue } from '../types'

import './Toolbar.css'

interface Props {
  filterSelected: FilterValue
  onClearCompleted: () => void
  handleFilterChange: (filter: FilterValue) => void
  completedCount: number
}

export const Toolbar: React.FC<Props> = ({
  filterSelected,
  handleFilterChange,
  onClearCompleted,
  completedCount,
  }) => {
  return (
    <section className="toolbar">
      <Filters
        filterSelected={filterSelected}
        onFilterChange={handleFilterChange}
      />

      {
        completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="clear-completed"
          >
          Clear completed
          </button>
)}

    </section>
  )
}