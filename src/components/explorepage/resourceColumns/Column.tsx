import React from 'react'
import styled from 'styled-components'

import { ResourceGroup } from '../../../pages/explore'

const ColumnContainer = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
`

const Column: React.FC<{ name: string; resources: ResourceGroup | undefined }> =
  ({ name, resources }) => {
    console.log(resources)
    return (
      <ColumnContainer>
        <h3>{name}</h3>
        {resources &&
          resources.nodes.map(resource => <p>{resource.data.Resource_Name}</p>)}
      </ColumnContainer>
    )
  }

export default Column
