import React from 'react'
import styled from 'styled-components'
import RemoveFilterButton from './RemoveFilterButton'

import { Filter } from '../../../pages/explore'
import { FilterProps } from './FilterBar'

const FilterContainer = styled.div`
  display: flex;
  margin-top: 30px;
`

const ActiveFilters: React.FC<FilterProps> = ({ filters, setFilters }) => {
  const removeFilter = (filter: Filter) => {
    setFilters(prev => prev.filter(f => f.name !== filter.name))
  }

  return (
    <FilterContainer>
      {filters.map(filter => (
        <RemoveFilterButton onClick={() => removeFilter(filter)}>
          {filter.name}
        </RemoveFilterButton>
      ))}
    </FilterContainer>
  )
}

export default ActiveFilters
