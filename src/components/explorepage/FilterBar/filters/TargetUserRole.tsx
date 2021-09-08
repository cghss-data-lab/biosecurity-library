import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import FilterControl from '../FilterControl'

import { FilterOptions, FilterProps } from '../FilterBar'

const TargetUserRole: React.FC<FilterProps> = ({
  exploreState,
  setExploreState,
}) => {
  const name = 'Target_user_role'

  const {
    distinctOptions: { distinct: options },
  } = useStaticQuery<FilterOptions>(graphql`
    query userRolesQuery {
      distinctOptions: allAirtable(
        filter: { table: { eq: "Resource Library" } }
      ) {
        distinct(field: data___Target_user_role)
      }
    }
  `)

  return <FilterControl {...{ name, options, exploreState, setExploreState }} />
}

export default TargetUserRole
