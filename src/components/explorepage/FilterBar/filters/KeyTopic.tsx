import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { FilterOptions, FilterProps } from '../FilterBar'

import FilterControl from '../FilterControl'
import { FilterLabel, NameContainer } from '../displayComponents'

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

  return (
    <FilterLabel>
      <NameContainer>
        <div>Key Topic Filter</div>
        <button>ex</button>
      </NameContainer>
      <FilterControl name="Key Topic" {...{ options, setFilters }} />
    </FilterLabel>
  )
}

export default KeyTopic
