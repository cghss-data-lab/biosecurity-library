import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { FilterFields } from '../../../pages/explore'
import { FilterProps } from './FilterBar'
import FilterControl from './FilterControl'

const FilterContainer = styled.section`
  display: flex;
  justify-content: stretch;
  gap: 15px;
  margin-top: 50px;
`

type FilterOptions = {
  [key in FilterFields]: {
    distinct: string[]
  }
}

const FilterSection: React.FC<FilterProps> = ({
  exploreState,
  setExploreState,
}) => {
  const filterOptions: FilterOptions = useStaticQuery(graphql`
    query filterOptionsQuery {
      Target_user_role: allAirtable(
        filter: { table: { eq: "Resource Library" } }
      ) {
        distinct(field: data___Target_user_role)
      }
      Key_Topic_Area_s_: allAirtable(
        filter: { table: { eq: "Resource Library" } }
      ) {
        distinct(field: data___Key_Topic_Area_s_)
      }
      Authoring_Organization: allAirtable(
        filter: { table: { eq: "Resource Library" } }
      ) {
        distinct(field: data___Authoring_Organization)
      }
      User_Roll_Up: allAirtable(filter: { table: { eq: "Resource Library" } }) {
        distinct(field: data___User_Roll_Up)
      }
    }
  `)

  return (
    <FilterContainer>
      {Object.entries(filterOptions).map(([name, { distinct: options }]) => (
        <FilterControl
          key={name}
          {...{ name, options, exploreState, setExploreState }}
        />
      ))}
    </FilterContainer>
  )
}

export default FilterSection
