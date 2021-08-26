import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

import { FilterOptions, FilterProps } from '../FilterBar'

// @ts-ignore: implicit any
import TypeaheadControl from '../../../ui/TypeaheadControl/TypeaheadControl'
// @ts-ignore: implicit any
import TypeaheadResult from '../../../ui/TypeaheadControl/TypeaheadResult'

import { useState } from 'react'

const FilterLabel = styled.label`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
`
const NameContainer = styled.div`
  display: flex;
  justify-content: space-between;
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

  interface Selected {
    label: string
  }
  const [selectedOptions, setSelectedOptions] = useState<Selected>()

  return (
    <FilterLabel>
      <NameContainer>
        <div>Key Topic Filter</div>
        <button>ex</button>
      </NameContainer>
      <TypeaheadControl
        className={''}
        placeholder={selectedOptions?.label || 'key topics'}
        items={options.map(o => ({ label: o }))}
        value={selectedOptions}
        onChange={(option: any) => {
          if (option) {
            setSelectedOptions(option)
            console.log(option)
          }
        }}
        renderItem={({ label }: { label: string }) => (
          <TypeaheadResult>{label}</TypeaheadResult>
        )}
      />
    </FilterLabel>
  )
}

export default KeyTopic
