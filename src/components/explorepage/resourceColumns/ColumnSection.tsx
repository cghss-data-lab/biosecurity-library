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
  let locationHash
  if (typeof window !== 'undefined') {
    locationHash = decodeURI(window?.location.hash.split('#')[1])
  }

  const [expandColumn, setExpandColumn] = useState<string | undefined>(
    locationHash !== 'undefined' ? locationHash : undefined
  )

  const handleExpandColumn = (column: string | undefined) => {
    setExpandColumn(column)
    if (column) {
      history.pushState({}, '', '#' + column)
    } else {
      history.pushState({}, '', '#')
    }
  }

  const displayResources = expandColumn
    ? resources.filter(r => r.fieldValue === expandColumn)!
    : resources

  return (
    <ColumnsContainer>
      {displayResources.map(group => (
        <Column
          key={group.fieldValue}
          name={group.fieldValue}
          resources={group}
          expand={group.fieldValue === expandColumn}
          setExpandColumn={handleExpandColumn}
        />
      ))}
    </ColumnsContainer>
  )
}

export default ColumnSection
