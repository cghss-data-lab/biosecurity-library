import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import FilterControl from '../FilterControl'
import { FilterLabel, NameContainer } from '../DisplayComponents'

import { FilterOptions, FilterProps } from '../FilterBar'

const KeyTopic: React.FC<FilterProps> = ({ exploreState, setExploreState }) => {
  const name = 'Key topic'

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

  return (
    <FilterLabel>
      <NameContainer>
        <div>Key topic</div>
        <button
          onClick={() => setExploreState(prev => ({ ...prev, defs: name }))}
        >
          +
        </button>
      </NameContainer>
      <FilterControl
        {...{ name, options, exploreState, setExploreState }}
        createFilter={(option, name) => ({
          name: `${name}: ${option.label}`,
          test: ({ data }) => data.Key_Topic_Area_s_.includes(option.label),
        })}
      />
    </FilterLabel>
  )
}

export default KeyTopic
