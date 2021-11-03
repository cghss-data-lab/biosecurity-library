import React from 'react'
import { ExploreState } from '../../../pages/explore'

import TypeaheadControl, {
  Item,
} from '../../ui/TypeaheadControl/TypeaheadControl'

import TypeaheadResult from '../../ui/TypeaheadControl/TypeaheadResult'
import { FilterContainer, NameContainer } from './displayComponents'
import ExpandDefinitionsButton from './ExpandDefinitionsButton'
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
    <FilterContainer>
      <NameContainer expanded={exploreState.defs === name}>
        <div>{name.replace(/_/g, ' ')}</div>
        <ExpandDefinitionsButton {...{ name, exploreState, setExploreState }} />
      </NameContainer>
      <TypeaheadControl
        multiselect
        className={''}
        ariaLabel={name.replace(/_/g, ' ') + ' filter search'}
        placeholder={`${selectedOptionKeys?.length ?? 0} of ${options.length}`}
        items={getItems(remainingOptionKeys)}
        values={getItems(selectedOptionKeys ?? [])}
        onAdd={item => addFilter({ [name]: [item.label] }, setExploreState)}
        onRemove={item =>
          removeFilter({ [name]: [item.label] }, setExploreState)
        }
        RenderItem={({ item: { label } }) => (
          <TypeaheadResult>{label}</TypeaheadResult>
        )}
      />
    </FilterContainer>
  )
}

export default FilterControl
