import React, { useState } from 'react'

// @ts-ignore: implicit any
import TypeaheadControl from '../../ui/TypeaheadControl/TypeaheadControl'
// @ts-ignore: implicit any
import TypeaheadResult from '../../ui/TypeaheadControl/TypeaheadResult'

import { Filter } from '../../../pages/explore'

interface FilterControlProps {
  name: string
  options: string[]
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>
}

interface Selected {
  label: string
}

const FilterControl: React.FC<FilterControlProps> = ({
  name,
  options,
  setFilters,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Selected>()
  return (
    <TypeaheadControl
      className={''}
      placeholder={selectedOptions?.label || name}
      items={options.map(o => ({ label: o }))}
      value={selectedOptions}
      onChange={(option: any) => {
        if (option) {
          setSelectedOptions(option)
          setFilters(prev => [
            ...prev,
            {
              name: `${name}: ${option.label}`,
              test: ({ data }) => data.Key_Topic_Area_s_.includes(option.label),
            },
          ])
        } else {
          setSelectedOptions(undefined)
          setFilters(prev => prev.filter(filter => !filter.name.includes(name)))
        }
      }}
      renderItem={({ label }: { label: string }) => (
        <TypeaheadResult>{label}</TypeaheadResult>
      )}
    />
  )
}

export default FilterControl
