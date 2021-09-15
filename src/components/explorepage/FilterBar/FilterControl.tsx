import React, { useState } from 'react'
import { ExploreState } from '../../../pages/explore'

// @ts-ignore: implicit any
import TypeaheadControl from '../../ui/TypeaheadControl/TypeaheadControl'
// @ts-ignore: implicit any
import TypeaheadResult from '../../ui/TypeaheadControl/TypeaheadResult'
import { FilterLabel, NameContainer } from './displayComponents'
import { addFilter } from './filterOperations'

interface Option {
  label: string
}

interface FilterControlProps {
  name: string
  options: string[]
  exploreState: ExploreState
  setExploreState: React.Dispatch<React.SetStateAction<ExploreState>>
}

interface Selected {
  label: string
}

const FilterControl: React.FC<FilterControlProps> = ({
  name,
  options,
  exploreState,
  setExploreState,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Selected>()
  return (
    <FilterLabel>
      <NameContainer>
        <div>{name.replace(/_/g, ' ')}</div>
        <button
          onClick={() => setExploreState(prev => ({ ...prev, defs: name }))}
        >
          +
        </button>
      </NameContainer>
      <TypeaheadControl
        className={''}
        placeholder={selectedOptions?.label || name.replace(/_/g, ' ')}
        items={options.map(o => ({ label: o, key: o }))}
        value={selectedOptions}
        onChange={(option: Option) => {
          if (option) {
            setSelectedOptions(option)
            addFilter({ [name]: [option.label] }, setExploreState)
          } else {
            setSelectedOptions(undefined)
          }
        }}
        renderItem={({ label }: { label: string }) => (
          <TypeaheadResult>{label}</TypeaheadResult>
        )}
      />
    </FilterLabel>
  )
}

export default FilterControl
