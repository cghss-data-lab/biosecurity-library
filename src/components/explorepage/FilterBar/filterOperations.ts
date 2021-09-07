import React from 'react'
import { ExploreState } from '../../../pages/explore'

type FilterFunction = (
  filter: ExploreState['filters'],
  setExploreState: React.Dispatch<React.SetStateAction<ExploreState>>
) => void

// addFilter should go here too
// const addFilter = () => {}

export const removeFilter: FilterFunction = (filter, setExploreState) => {
  if (filter)
    setExploreState(prev => {
      if (!prev.filters) return prev

      const [filterKey, filterVal] = Object.entries(filter)[0] as [
        keyof typeof prev.filters,
        typeof prev.filters[keyof typeof prev.filters]
      ]

      // remove only the value selected for removal
      // from the array of values in the filter
      let newValues = prev.filters[filterKey]?.filter(
        val => !filterVal?.includes(val)
      )

      if (newValues?.length === 0) {
        // remove the filter completely if there are no more values
        const { [filterKey]: _, ...newFilters } = prev.filters
        return { ...prev, filters: newFilters }
      }

      return {
        ...prev,
        filters: {
          ...prev.filters,
          [filterKey]: newValues,
        },
      }
    })
}

type ApplyFilterFunction = (
  resources: ResourceGroup[],
  filters: ExploreState['filters']
) => ResourceGroup[]

export const applyFilters: ApplyFilterFunction = (resources, filters) => {
  // check if there even are filters
  if (!filters || Object.keys(filters).length === 0) return resources
  // if there are, apply them and return resources
  return Object.entries(filters).reduce(
    (prev, [field, values]) =>
      prev.map(group => ({
        ...group,
        nodes: group.nodes.filter(node =>
          values.some(value =>
            node.data[field as keyof typeof filters].includes(value)
          )
        ),
      })),
    resources
  )
}
