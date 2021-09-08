import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import FilterControl from '../FilterControl'

import { FilterOptions, FilterProps } from '../FilterBar'

const AuthoringOrganization: React.FC<FilterProps> = ({
  exploreState,
  setExploreState,
}) => {
  const name = 'Authoring_Organization'

  const {
    distinctOptions: { distinct: options },
  } = useStaticQuery<FilterOptions>(graphql`
    query authoringOrganizationQuery {
      distinctOptions: allAirtable(
        filter: { table: { eq: "Resource Library" } }
      ) {
        distinct(field: data___Authoring_Organization)
      }
    }
  `)

  return <FilterControl {...{ name, options, exploreState, setExploreState }} />
}

export default AuthoringOrganization
