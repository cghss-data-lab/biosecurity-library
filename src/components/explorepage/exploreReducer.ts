// This file is not currently used.
// this is a better development pattern, and should
// replace the current implementation (which uses)
// the filterOperations.ts file; this needs to be
// expanded to reduce all states of exploreState
// before it can fully replace that system though.

import { ExploreState } from '../../pages/explore'

// All the valid fields for filtering
export enum FilterFields {
  Target_user_role = 'Target_user_role',
  User_type = 'User_type',
  Key_topic_area = 'Key_topic_area',
  Resource_language = 'Resource_language',
  Access_limitations = 'Access_limitations',
  Resource_format = 'Resource_format',
  Authoring_organization = 'Authoring_organization',
  Authoring_organization_type = 'Authoring_organization_type',
}

// Filter object
export type Filters = {
  [key in FilterFields]?: string[]
}

// valid filter reducer actions
export enum FilterActions {
  Add = 'add',
  Remove = 'remove',
  Toggle = 'toggle',
}

type FilterActionFunction = (
  state: ExploreState,
  filter: ExploreState['filters']
) => ExploreState

const addFilters: FilterActionFunction = (state, filters) => {
  if (!filters) return state

  let newState = { ...state }

  for (const [key, filterVal] of Object.entries(filters)) {
    const filterKey = key as keyof typeof filters

    newState = {
      ...newState,
      filters: {
        ...(newState.filters && newState.filters),
        [filterKey]: [
          ...(newState.filters?.[filterKey as keyof typeof filters] ?? []),
          ...filterVal,
        ],
      },
    }
  }

  return newState
}

const removeFilters: FilterActionFunction = (state, filters) => {
  if (!filters) return state

  let newState = { ...state }

  for (const [key, filterVal] of Object.entries(filters)) {
    const filterKey = key as keyof typeof filters

    // skip iteration if there are no more filters to remove
    if (!newState.filters) continue

    // remove only the value selected for removal
    // from the array of values in the filter
    let newValues = newState.filters[filterKey]?.filter(
      val => !filterVal?.includes(val)
    )

    // remove the filter key if there are no more values
    if (newValues?.length === 0) {
      const { [filterKey]: _, ...newFilters } = newState.filters
      newState = { ...newState, filters: newFilters }
      continue
    }

    newState = {
      ...newState,
      filters: {
        ...newState.filters,
        [filterKey]: newValues,
      },
    }
  }

  return newState
}

const toggleFilters: FilterActionFunction = (state, filters) => {
  if (!filters) return state

  let newState = { ...state }

  for (const [key, filterVal] of Object.entries(filters)) {
    const filterKey = key as keyof typeof filters

    if (newState.filters?.[filterKey]?.includes(filterVal[0]))
      newState = removeFilters(newState, filters)
    else newState = addFilters(newState, filters)
  }

  return newState
}

type ExploreReducerFunction = (
  state: ExploreState,
  action: {
    type: FilterActions
    payload: Filters | string
  }
) => ExploreState

const exploreReducer: ExploreReducerFunction = (state, { type, payload }) => {
  switch (type) {
    case FilterActions.Add:
      if (typeof payload !== 'string') return addFilters(state, payload)
      break
    case FilterActions.Remove:
      if (typeof payload !== 'string') return removeFilters(state, payload)
      break
    case FilterActions.Toggle:
      if (typeof payload !== 'string') return toggleFilters(state, payload)
      break
  }

  return state
}

export default exploreReducer
