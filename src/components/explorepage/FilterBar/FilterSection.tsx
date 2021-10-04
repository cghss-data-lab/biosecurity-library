import React from 'react'
import styled from 'styled-components'

import { FilterProps } from './FilterBar'

import useFilterOptions from '../../../airtableQueryHooks/useFilterOptions'

import FilterControl from './FilterControl'

const FilterContainer = styled.section`
  display: flex;
  justify-content: stretch;
  gap: 15px;
  margin-top: 50px;
`

const FilterSection: React.FC<FilterProps> = ({
  exploreState,
  setExploreState,
}) => {
  const filterOptions = useFilterOptions()

  return (
    <FilterContainer>
      {Object.entries(filterOptions).map(([name, { distinct: options }]) => (
        <FilterControl
          key={name}
          {...{ name, options, exploreState, setExploreState }}
        />
      ))}
    </FilterContainer>
  )
}

export default FilterSection
