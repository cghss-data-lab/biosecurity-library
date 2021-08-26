import React from 'react'
import styled from 'styled-components'
import { Filter } from '../../../pages/explore'
import KeyTopic from './filters/KeyTopic'

const FilterSection = styled.section`
  display: flex;
  justify-content: stretch;
  gap: 15px;
`

// This should be inhereted by each of the filters
export interface FilterProps {
  filters: Filter[]
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>
}

// All the filter options queries should follow this interface
export interface FilterOptions {
  distinctOptions: { distinct: string[] }
}

const FilterBar: React.FC<FilterProps> = ({ filters, setFilters }) => {
  return (
    <FilterSection>
      <KeyTopic {...{ filters, setFilters }} />
      <KeyTopic {...{ filters, setFilters }} />
      <KeyTopic {...{ filters, setFilters }} />
      <KeyTopic {...{ filters, setFilters }} />
    </FilterSection>
  )
}

export default FilterBar
