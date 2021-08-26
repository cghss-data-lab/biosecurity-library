import React from 'react'
import styled from 'styled-components'

import Column from './Column'

import { ResourceGroup } from '../../../pages/explore'

const ColumnsContainer = styled.section`
  display: flex;
  justify-content: space-between;
`

const ColumnSection: React.FC<{ resources: ResourceGroup[] }> = ({
  resources,
}) => (
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

export default ColumnSection
