import React from 'react'
import styled from 'styled-components'

import Column from './Column'

import { ResourceGroup } from '../../../pages/explore'
import { useState } from 'react'

const ColumnsContainer = styled.section`
  display: flex;
  gap: 36px;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 40px;
  margin-top: 40px;
  border-top: 2px solid ${({ theme }) => theme.colorDarkGray};
  margin-bottom: 10vw;
`

const ColumnSection: React.FC<{ resources: ResourceGroup[] }> = ({
  resources,
}) => {
  const [expandColumn, setExpandColumn] = useState<string | undefined>()

  const displayResources = expandColumn
    ? resources.filter(r => r.fieldValue === expandColumn)
    : resources

  // const displayResources = resources

  return (
    <ColumnsContainer>
      {displayResources.map(group => (
        <Column
          key={group.fieldValue}
          name={group.fieldValue}
          // this icon name needs to pull from airtable
          icon={'Lab research'}
          resources={group}
          expand={group.fieldValue === expandColumn}
          setExpandColumn={setExpandColumn}
        />
      ))}
    </ColumnsContainer>
  )
}

export default ColumnSection
