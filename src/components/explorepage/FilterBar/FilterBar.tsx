import React from 'react'
import styled from 'styled-components'
import { Filter } from '../../../pages/explore'
import AuthoringOrganization from './filters/AuthoringOrganization'

import KeyTopic from './filters/KeyTopic'
import RecommendedUsership from './filters/RecommendedUsership'
import TargetUserRole from './filters/TargetUserRole'

const FilterSection = styled.section`
  display: flex;
  justify-content: stretch;
  gap: 15px;
  margin-top: 50px;
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
      <TargetUserRole {...{ filters, setFilters }} />
      <RecommendedUsership {...{ filters, setFilters }} />
      <AuthoringOrganization {...{ filters, setFilters }} />
    </FilterSection>
  )
}

export default FilterBar
