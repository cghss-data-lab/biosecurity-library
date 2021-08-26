import React from 'react'
import styled from 'styled-components'
import { Filter } from '../../../pages/explore'

const FilterSection = styled.section``

// This should be inhereted by each of the filters
export interface FilterProps {
  filters: Filter[]
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>
}

// All the filter options queries should follow this interface
export interface FilterOptions {
  distinctOptions: { distinct: { options: string[] } }
}

const FilterBar: React.FC<FilterProps> = ({ filters, setFilters }) => {
  return (
    <FilterSection>
      <h2>Filters go here</h2>
    </FilterSection>
  )
}

export default FilterBar
