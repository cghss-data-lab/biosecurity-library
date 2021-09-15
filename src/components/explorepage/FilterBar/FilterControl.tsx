import React, { useState } from 'react'
import { ExploreState } from '../../../pages/explore'

import TypeaheadControl, {
  Item,
} from '../../ui/TypeaheadControl/TypeaheadControl'
import TypeaheadResult from '../../ui/TypeaheadControl/TypeaheadResult'
import { FilterLabel, NameContainer } from './displayComponents'
import { addFilter } from './filterOperations'

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
  const [selectedOptions, setSelectedOptions] = useState<Item>()
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
        className={''}
        placeholder={selectedOptions?.label || name.replace(/_/g, ' ')}
        items={options.map(o => ({ label: o, key: o }))}
        value={selectedOptions}
        onChange={(item: Item | undefined) => {
          if (item) {
            setSelectedOptions(item)
            addFilter({ [name]: [item.label] }, setExploreState)
          } else {
            setSelectedOptions(undefined)
          }
        }}
        RenderItem={({ item: { label } }) => (
          <TypeaheadResult>{label}</TypeaheadResult>
        )}
      />
    </FilterLabel>
  )
}

export default FilterControl
