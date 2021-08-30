import React, { useState } from 'react'

// @ts-ignore: implicit any
import TypeaheadControl from '../../ui/TypeaheadControl/TypeaheadControl'
// @ts-ignore: implicit any
import TypeaheadResult from '../../ui/TypeaheadControl/TypeaheadResult'

import { Filter } from '../../../pages/explore'

interface Option {
  label: string
}

interface FilterControlProps {
  name: string
  options: string[]
  createFilter: (option: Option, name: string) => Filter
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>
}

interface Selected {
  label: string
}

const FilterControl: React.FC<FilterControlProps> = ({
  name,
  options,
  setFilters,
  createFilter,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Selected>()
  return (
    <TypeaheadControl
      className={''}
      placeholder={selectedOptions?.label || name}
      items={options.map(o => ({ label: o, key: o }))}
      value={selectedOptions}
      onChange={(option: Option) => {
        if (option) {
          setSelectedOptions(option)
          setFilters(prev => [
            ...prev.filter(filter => !filter.name.includes(name)),
            createFilter(option, name),
          ])
        } else {
          // setSelectedOptions(undefined)
          // setFilters(prev => prev.filter(filter => !filter.name.includes(name)))
        }
      }}
      renderItem={({ label }: { label: string }) => (
        <TypeaheadResult>{label}</TypeaheadResult>
      )}
    />
  )
}

export default FilterControl
