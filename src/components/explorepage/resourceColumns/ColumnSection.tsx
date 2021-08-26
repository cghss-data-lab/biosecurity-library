import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

import Column from './Column'

import { ResourceGroup } from '../../../pages/explore'

const ColumnsContainer = styled.section`
  display: flex;
  justify-content: space-between;
`

// interface QueryResult {
//   resourceTypes: {
//     distinct: string[]
//   }
// }

const ColumnSection: React.FC<{ resources: ResourceGroup[] }> = ({
  resources,
}) => {
  // the columns get their own query so that we always know
  // all the columns even if some of the columns are filtered
  // down to no entries

  // depending on how the filters work, this should be unnecessary...
  // const {
  //   resourceTypes: { distinct: columns },
  // }: QueryResult = useStaticQuery(graphql`
  //   query resourceTypeQuery {
  //     resourceTypes: allAirtable(
  //       filter: {
  //         table: { eq: "Resource Library" }
  //         data: { Publish_INTERNAL: { eq: true } }
  //       }
  //     ) {
  //       distinct(field: data___Resource_Type)
  //     }
  //   }
  // `)

  console.log(resources)

  return (
    <ColumnsContainer>
      {resources.map(group => (
        <Column
          key={group.fieldValue}
          name={group.fieldValue}
          resources={group}
        />
      ))}
    </ColumnsContainer>
  )
}

export default ColumnSection
