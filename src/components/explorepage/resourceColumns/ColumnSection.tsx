import React from 'react'
import styled from 'styled-components'

import Column from './Column'

import { ResourceGroup } from '../../../pages/explore'

const ColumnsContainer = styled.section`
  display: flex;
  gap: 36px;
  justify-content: space-between;
  padding-top: 40px;
  margin-top: 40px;
  border-top: 2px solid ${({ theme }) => theme.colorDarkGray};
`

const ColumnSection: React.FC<{ resources: ResourceGroup[] }> = ({
  resources,
}) => (
  <ColumnsContainer>
    {resources.map(group => (
      <Column
        key={group.fieldValue}
        name={group.fieldValue}
        // this icon name needs to pull from airtable
        icon={'Lab research'}
        resources={group}
      />
    ))}
  </ColumnsContainer>
)

export default ColumnSection
