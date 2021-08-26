import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import FilterControl from '../FilterControl'
import { FilterLabel, NameContainer } from '../DisplayComponents'

import { FilterOptions, FilterProps } from '../FilterBar'

const TargetUserRole: React.FC<FilterProps> = ({ filters, setFilters }) => {
  const name = 'Target user role'

  const {
    distinctOptions: { distinct: options },
  } = useStaticQuery<FilterOptions>(graphql`
    query userRolesQuery {
      distinctOptions: allAirtable(
        filter: {
          table: { eq: "Resource Library" }
          data: { Publish_INTERNAL: { eq: true } }
        }
      ) {
        distinct(field: data___Target_user_role)
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
          test: ({ data }) => data.Target_user_role.includes(option.label),
        })}
      />
    </FilterLabel>
  )
}

export default TargetUserRole
