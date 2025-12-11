import { FILTERS_BUTTONS  } from '../consts'
import { type FilterValue } from '../types'

import './Filters.css'

interface Props {
  onFilterChange: (filter: FilterValue) => void
  filterSelected: FilterValue
}

export const Filters: React.FC<Props> = (
  { filterSelected, onFilterChange }
) => {
  return (
    <ul className="filters">
      {
        Object.entries(FILTERS_BUTTONS).map(([key, { literal }]) => {
            const isSelected = key === filterSelected
            const className = isSelected ? 'selected' : ''

            return (
              <li key={key}>
                <button 
                  className={`filter-button ${className}`} 
                  onClick={(event) => {
                    event.preventDefault()
                    onFilterChange(key as FilterValue)
                  }}
                >
                  {literal}
                </button>
              </li>
            )
          })
      }
    </ul>
  )
}