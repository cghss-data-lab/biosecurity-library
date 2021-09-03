import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import FilterControl from '../FilterControl'
import { FilterLabel, NameContainer } from '../DisplayComponents'

import { FilterOptions, FilterProps } from '../FilterBar'

const UserRollup: React.FC<FilterProps> = ({ filters, setFilters }) => {
  const name = 'Recommended usership'

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

  return (
    <FilterLabel>
      <NameContainer>
        <div>{name}</div>
        <button>+</button>
      </NameContainer>
      <FilterControl
        {...{ name, options, setFilters }}
        createFilter={(option, name) => ({
          name: `${name}: ${option.label}`,
          test: ({ data }) => data.User_Roll_Up.includes(option.label),
        })}
      />
    </FilterLabel>
  )
}

export default UserRollup
