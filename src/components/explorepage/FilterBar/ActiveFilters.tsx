import React from 'react'
import styled from 'styled-components'
import RemoveFilterButton from './RemoveFilterButton'

import { FilterProps } from './FilterBar'
import { removeFilter } from './filterOperations'

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 30px;
`

const ActiveFilters: React.FC<FilterProps> = ({
  exploreState,
  setExploreState,
}) => (
  <FilterContainer>
    {exploreState.filters &&
      Object.entries(exploreState.filters).map(([filterName, filterValues]) =>
        filterValues.map(value => (
          <RemoveFilterButton
            key={value}
            onClick={() =>
              removeFilter({ [filterName]: [value] }, setExploreState)
            }
          >
            {filterName.replace(/_/g, ' ')}: {value}
          </RemoveFilterButton>
        ))
      )}
  </FilterContainer>
)

export default ActiveFilters
