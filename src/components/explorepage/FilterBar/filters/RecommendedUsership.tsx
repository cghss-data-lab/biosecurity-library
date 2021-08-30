import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import FilterControl from '../FilterControl'
import { FilterLabel, NameContainer } from '../DisplayComponents'

import { FilterOptions, FilterProps } from '../FilterBar'

const RecommendedUsership: React.FC<FilterProps> = ({
  filters,
  setFilters,
}) => {
  const name = 'Recommended usership'

  const {
    distinctOptions: { distinct: options },
  } = useStaticQuery<FilterOptions>(graphql`
    query recommendedUsershipQuery {
      distinctOptions: allAirtable(
        filter: { table: { eq: "Resource Library" } }
      ) {
        distinct(field: data___Recommended_usership)
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
          test: ({ data }) => data.Recommended_usership.includes(option.label),
        })}
      />
    </FilterLabel>
  )
}

export default RecommendedUsership
