import React from 'react'
import styled from 'styled-components'
import RemoveFilterButton from './RemoveFilterButton'

import { FilterProps } from './FilterBar'
import { removeAllFilters, removeFilter } from './filterOperations'

const Section = styled.section`
  display: flex;
  align-items: flex-start;
  margin-top: 30px;
`
const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`
const ClearFilters = styled.button`
  background: none;
  border: none;
  border: 1px solid ${({ theme }) => theme.colorBlack};
  padding: 0.5em 1em;
  border-radius: 5px;
  flex-shrink: 0;
  box-shadow: 2px 2px 12px 0px rgba(0, 0, 0, 0);
  transition: 250ms ease;
  margin-left: auto;

  &:hover {
    box-shadow: 2px 2px 12px 0px rgba(0, 0, 0, 0.25);
    background: ${({ theme }) => theme.colorYellow};
  }
`
const MoreFilters = styled(ClearFilters)<{
  open: boolean
}>`
  margin-left: 0.5em;
  ${({ theme, open }) => open && `background: ${theme.colorGolden}`}
`

const ActiveFilters: React.FC<FilterProps> = ({
  exploreState,
  setExploreState,
}) => (
  <Section>
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
              {filterName.replace(/_/g, ' ')}: <strong>{value}</strong>
            </RemoveFilterButton>
          ))
        )}
    </FilterContainer>
    <ClearFilters onClick={() => removeAllFilters(setExploreState)}>
      Clear filters
    </ClearFilters>
    <MoreFilters
      open={Boolean(exploreState.moreFilters)}
      onClick={() =>
        setExploreState(prev => {
          if (!prev.moreFilters) return { ...prev, moreFilters: 'true' }
          const { moreFilters, ...next } = prev
          console.log({ next })
          return { ...next }
        })
      }
    >
      + More filters
    </MoreFilters>
  </Section>
)

export default ActiveFilters
