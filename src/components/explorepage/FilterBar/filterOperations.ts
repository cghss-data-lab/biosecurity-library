import React from 'react'

import { ExploreState } from '../../../pages/explore'
import { ResourceGroup } from '../../../airtableQueryHooks/useExplorePageData'

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

export const removeAllFilters = (
  setExploreState: React.Dispatch<React.SetStateAction<ExploreState>>
) => setExploreState(prev => ({ ...prev, filters: {} }))

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
          values.some(value => {
            const values = node.data[field as keyof typeof filters]

            // this handles the case of linked records where we will alias them so that
            // the string array is in is field.data.value
            // I just realized this only works if the column we're filtering on is a string type...
            if (
              values &&
              (values as any[]).every(d => typeof d === 'object' && d.data)
            )
              return values
                .map(d => (d as { data: { value: string } }).data.value)
                .includes(value)

            return values && (values as string[]).includes(value)
          })
        ),
      })),
    resources
  )
}
