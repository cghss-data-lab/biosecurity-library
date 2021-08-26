import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

import { FilterOptions, FilterProps } from '../FilterBar'

const FilterLabel = styled.label`
  display: flex;
  flex-direction: column;
`
const NameContainer = styled.div`
  display: flex;
`

const KeyTopic: React.FC<FilterProps> = ({ filters, setFilters }) => {
  const {
    distinctOptions: { distinct: options },
  } = useStaticQuery<FilterOptions>(graphql`
    query topicOptionsQuery {
      distinctOptions: allAirtable(
        filter: {
          table: { eq: "Resource Library" }
          data: { Publish_INTERNAL: { eq: true } }
        }
      ) {
        distinct(field: data___Key_Topic_Area_s_)
      }
    }
  `)
  console.log(options)
  return (
    <FilterLabel>
      <NameContainer>Key Topic Filter</NameContainer>
    </FilterLabel>
  )
}

export default KeyTopic
