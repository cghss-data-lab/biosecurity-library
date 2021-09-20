import React from 'react'
import { ExploreState, ResourceGroup } from '../../../pages/explore'

type FilterFunction = (
  filter: ExploreState['filters'],
  setExploreState: React.Dispatch<React.SetStateAction<ExploreState>>
) => void

export const addFilter: FilterFunction = (filter, setExploreState) => {
  // early return if there's no filter passed
  if (!filter) return

  // cast types for the keys because typescript drops them
  const [filterKey] = Object.keys(filter) as [keyof typeof filter]
  const [filterVal] = Object.values(filter)

  setExploreState(prev => ({
    ...prev,
    filters: {
      ...(prev.filters && prev.filters),
      [filterKey]: [...(prev.filters?.[filterKey] ?? []), ...filterVal],
    },
  }))
}

export const removeFilter: FilterFunction = (filter, setExploreState) => {
  // early return if there's no filter passed
  if (!filter) return

  // cast types for the keys because typescript drops them
  const filterKey = Object.keys(filter)[0] as keyof typeof filter
  const filterVal = Object.values(filter)[0]

  setExploreState(prev => {
    // early return if there are no filters to remove
    if (!prev.filters) return prev

    // remove only the value selected for removal
    // from the array of values in the filter
    let newValues = prev.filters[filterKey]?.filter(
      val => !filterVal?.includes(val)
    )

    // remove the filter completely if there are no more values
    if (newValues?.length === 0) {
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

export const toggleFilter: FilterFunction = (filter, setExploreState) => {
  // early return if there's no filter passed
  if (!filter) return

  // cast types for the keys because typescript drops them
  const filterKey = Object.keys(filter)[0] as keyof typeof filter
  const filterVal = Object.values(filter)[0]

  setExploreState(prev => {
    if (!prev.filters)
      return {
        ...prev,
        filters: {
          [filterKey]: [filterVal],
        },
      }

    if (prev.filters[filterKey]?.includes(filterVal[0])) {
      // remove only the value selected for removal
      // from the array of values in the filter
      let newValues = prev.filters[filterKey]?.filter(
        val => !filterVal?.includes(val)
      )

      // remove the filter completely if there are no more values
      if (newValues?.length === 0) {
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
    }

    return {
      ...prev,
      filters: {
        ...(prev.filters && prev.filters),
        [filterKey]: [...(prev.filters?.[filterKey] ?? []), ...filterVal],
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
