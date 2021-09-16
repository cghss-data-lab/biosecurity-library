import React from 'react'
import { ExploreState } from '../../../pages/explore'

import TypeaheadControl, {
  Item,
} from '../../ui/TypeaheadControl/TypeaheadControl'

import TypeaheadResult from '../../ui/TypeaheadControl/TypeaheadResult'
import { FilterLabel, NameContainer } from './displayComponents'
import { addFilter, removeFilter } from './filterOperations'

const getItems = (keys: string[]) =>
  keys.map(key => ({ label: key, key: key })) as Item[]

interface FilterControlProps {
  name: string
  options: string[]
  exploreState: ExploreState
  setExploreState: React.Dispatch<React.SetStateAction<ExploreState>>
}

const FilterControl: React.FC<FilterControlProps> = ({
  name,
  options,
  exploreState,
  setExploreState,
}) => {
  const selectedOptionKeys =
    exploreState.filters?.[name as keyof typeof exploreState.filters]

  const remainingOptionKeys = options.filter(
    option => !selectedOptionKeys?.includes(option)
  )

  return (
    <FilterLabel>
      <NameContainer>
        <div>{name.replace(/_/g, ' ')}</div>
        <button
          onClick={() =>
            setExploreState(prev => {
              if (prev.defs !== name) return prev
              const { defs: _, ...next } = prev
              return next
            })
          }
        >
          {exploreState.defs === name ? '-' : '+'}
        </button>
      </NameContainer>
      <TypeaheadControl
        multiselect
        className={''}
        placeholder={`${selectedOptionKeys?.length ?? 0} of ${options.length}`}
        items={getItems(remainingOptionKeys)}
        values={getItems(selectedOptionKeys ?? [])}
        onAdd={item => {
          addFilter({ [name]: [item.label] }, setExploreState)
        }}
        onRemove={item =>
          removeFilter({ [name]: [item.label] }, setExploreState)
        }
        RenderItem={({ item: { label } }) => (
          <TypeaheadResult>{label}</TypeaheadResult>
        )}
      />
    </FilterLabel>
  )
}

export default FilterControl
