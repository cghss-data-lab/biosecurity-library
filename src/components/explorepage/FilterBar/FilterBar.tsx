import React from 'react'
import styled from 'styled-components'
import { Filter } from '../../../pages/explore'

const FilterSection = styled.section``

interface FilterBarProps {
  filters: Filter[]
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters }) => {
  return (
    <FilterSection>
      <h2>Filters go here</h2>
    </FilterSection>
  )
}

export default FilterBar
