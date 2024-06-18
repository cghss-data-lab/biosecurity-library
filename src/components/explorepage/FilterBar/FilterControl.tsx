import React from 'react'
import { ExploreState } from '../../../pages/explore'

import Typeahead from 'components/ui/Typeahead'

import { FilterContainer, NameContainer } from './displayComponents'
import ExpandDefinitionsButton from './ExpandDefinitionsButton'
import { addFilter, removeFilter } from './filterOperations'
import useDefinitions from 'airtableQueryHooks/useDefinitions'
import { cleanAirtableKey } from 'airtable-cms/utilities'

const getItems = (keys: string[]) => keys.map(key => ({ label: key, key: key }))

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

  const definitons = useDefinitions()

  const hasDefinitions =
    definitons.filter(def =>
      def.data.Column.some(col => cleanAirtableKey(col) === name)
    ).length > 0

  return (
    <FilterContainer>
      <NameContainer expanded={exploreState.defs === name}>
        <div>{name.replace(/_/g, ' ')}</div>
        {hasDefinitions && (
          <ExpandDefinitionsButton
            {...{ name, exploreState, setExploreState }}
          />
        )}
      </NameContainer>
      <Typeahead
        multiselect
        ariaLabel={name.replace(/_/g, ' ') + ' filter search'}
        placeholder={`${selectedOptionKeys?.length ?? 0} of ${options.length}`}
        items={getItems(remainingOptionKeys)}
        values={getItems(selectedOptionKeys ?? [])}
        onAdd={item => addFilter({ [name]: [item.label] }, setExploreState)}
        onRemove={item =>
          removeFilter({ [name]: [item.label] }, setExploreState)
        }
      />
    </FilterContainer>
  )
}

export default FilterControl
