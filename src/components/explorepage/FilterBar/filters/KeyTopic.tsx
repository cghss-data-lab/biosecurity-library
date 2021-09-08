import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import FilterControl from '../FilterControl'

import { FilterOptions, FilterProps } from '../FilterBar'

const KeyTopic: React.FC<FilterProps> = ({ exploreState, setExploreState }) => {
  const name = 'Key_Topic_Area_s_'

  const {
    distinctOptions: { distinct: options },
  } = useStaticQuery<FilterOptions>(graphql`
    query topicOptionsQuery {
      distinctOptions: allAirtable(
        filter: { table: { eq: "Resource Library" } }
      ) {
        distinct(field: data___Key_Topic_Area_s_)
      }
    }
  `)

  return <FilterControl {...{ name, options, exploreState, setExploreState }} />
}

export default KeyTopic
