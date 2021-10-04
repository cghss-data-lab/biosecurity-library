import React from 'react'
import styled from 'styled-components'

import Column from './Column'

import { ExploreState } from '../../../pages/explore'
import { ResourceGroup } from '../../../airtableQueryHooks/useExplorePageData'

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

interface ColumnSectionProps {
  exploreState: ExploreState
  setExploreState: React.Dispatch<React.SetStateAction<ExploreState>>
  resources: ResourceGroup[]
}

const ColumnSection: React.FC<ColumnSectionProps> = ({
  resources,
  exploreState,
  setExploreState,
}) => {
  const handleExpandColumn = (column: string | undefined) => {
    setExploreState(prev => {
      if (column) return { ...prev, type: column }
      const { type: _, ...newState } = prev
      return newState
    })
  }

  const displayResources = exploreState.type
    ? resources.filter(r => r.fieldValue === exploreState.type)
    : resources

  return (
    <ColumnsContainer>
      {displayResources.map(group => (
        <Column
          key={group.fieldValue}
          name={group.fieldValue}
          resources={group}
          expand={group.fieldValue === exploreState.type}
          setExpandColumn={handleExpandColumn}
        />
      ))}
    </ColumnsContainer>
  )
}

export default ColumnSection
