import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import FilterControl from '../FilterControl'
import { FilterLabel, NameContainer } from '../DisplayComponents'

import { FilterOptions, FilterProps } from '../FilterBar'

const AuthoringOrganization: React.FC<FilterProps> = ({
  filters,
  setFilters,
}) => {
  const name = 'Authoring Organization'

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

  return (
    <FilterLabel>
      <NameContainer>
        <div>{name}</div>
        <button>ex</button>
      </NameContainer>
      <FilterControl
        {...{ name, options, setFilters }}
        createFilter={(option, name) => ({
          name: `${name}: ${option.label}`,
          test: ({ data }) =>
            data.Authoring_Organization.includes(option.label),
        })}
      />
    </FilterLabel>
  )
}

export default AuthoringOrganization
