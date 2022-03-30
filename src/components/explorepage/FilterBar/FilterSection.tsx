import React, { useLayoutEffect, useState } from 'react'
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
  margin-bottom: 25px;
  flex-wrap: wrap;
`
const HideFiltersButtonHolder = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
`
const HideFiltersButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  border: 1px solid ${({ theme }) => theme.colorBlack};
  padding: 0.5em 1em;
  border-radius: 5px;
  flex-shrink: 0;
  box-shadow: 2px 2px 12px 0px rgba(0, 0, 0, 0);
  transition: 250ms ease;

  &:hover {
    box-shadow: 2px 2px 12px 0px rgba(0, 0, 0, 0.25);
    background: ${({ theme }) => theme.colorYellow};
  }
`

const MoreFilters = styled(HideFiltersButton)<{
  open: boolean
}>`
  margin-top: 15px;
  ${({ theme, open }) => open && `background: ${theme.colorGolden}`}
`

const FilterSection: React.FC<FilterProps> = ({
  exploreState,
  setExploreState,
}) => {
  const filterOptions = useFilterOptions()
  const moreFilterOptions = useMoreFilterOptions()

  const [showFilters, setShowFilters] = useState(true)

  useLayoutEffect(() => {
    if (
      typeof window !== 'undefined' &&
      document.documentElement.clientWidth < 700
    ) {
      setShowFilters(false)
    } else {
      setShowFilters(true)
    }
  }, [])

  return (
    <>
      <HideFiltersButtonHolder>
        <HideFiltersButton onClick={() => setShowFilters(prev => !prev)}>
          {showFilters ? 'Hide filters' : 'Select filters'}
        </HideFiltersButton>
      </HideFiltersButtonHolder>
      <Expander open={showFilters}>
        <FilterContainer>
          {Object.entries(filterOptions).map(
            ([name, { distinct: options }]) => (
              <FilterControl
                key={name}
                {...{ name, options, exploreState, setExploreState }}
              />
            )
          )}
        </FilterContainer>
        <Expander open={Boolean(exploreState.moreFilters)}>
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
        <HideFiltersButtonHolder>
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
            {Boolean(exploreState.moreFilters) ? `Hide more ` : `+ More `}{' '}
            filters
          </MoreFilters>
        </HideFiltersButtonHolder>
      </Expander>
    </>
  )
}

export default FilterSection
