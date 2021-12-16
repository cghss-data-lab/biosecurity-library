import React from 'react'
import styled from 'styled-components'

import { FilterProps } from './FilterBar'

import useFilterOptions from '../../../airtableQueryHooks/useFilterOptions'

import FilterControl from './FilterControl'
import useMoreFilterOptions from 'airtableQueryHooks/useMoreFilterOptions'
import Expander from 'components/ui/Expander'

const FilterContainer = styled.section`
  display: flex;
  justify-content: stretch;
  gap: 36px;
  margin-top: 50px;
`

const FilterSection: React.FC<FilterProps> = ({
  exploreState,
  setExploreState,
}) => {
  const filterOptions = useFilterOptions()
  const moreFilterOptions = useMoreFilterOptions()

  return (
    <>
      <FilterContainer>
        {Object.entries(filterOptions).map(([name, { distinct: options }]) => (
          <FilterControl
            key={name}
            {...{ name, options, exploreState, setExploreState }}
          />
        ))}
      </FilterContainer>
      <Expander open={exploreState.moreFilters}>
        <FilterContainer>
          {Object.entries(moreFilterOptions).map(
            ([name, { distinct: options }]) => (
              <FilterControl
                key={name}
                {...{ name, options, exploreState, setExploreState }}
              />
            )
          )}
        </FilterContainer>
      </Expander>
    </>
  )
}

export default FilterSection
