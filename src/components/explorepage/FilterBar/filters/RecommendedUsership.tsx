import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import FilterControl from '../FilterControl'

import { FilterOptions, FilterProps } from '../FilterBar'

const UserRollup: React.FC<FilterProps> = ({
  exploreState,
  setExploreState,
}) => {
  const name = 'User_Roll_Up'

  const {
    distinctOptions: { distinct: options },
  } = useStaticQuery<FilterOptions>(graphql`
    query userRollupQuery {
      distinctOptions: allAirtable(
        filter: { table: { eq: "Resource Library" } }
      ) {
        distinct(field: data___User_Roll_Up)
      }
    }
  `)

  return <FilterControl {...{ name, options, exploreState, setExploreState }} />
}

export default UserRollup
