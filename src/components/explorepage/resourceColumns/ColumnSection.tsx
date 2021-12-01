import React from 'react'
import styled, { useTheme } from 'styled-components'

import Column from './Column'

import { ExploreState } from 'pages/explore'
import useExplorePageData, {
  ResourceGroup,
} from 'airtableQueryHooks/useExplorePageData'
import Tippy from '@tippyjs/react'
import CMS from 'AirtableCMS'

const ColumnsContainer = styled.section`
  display: flex;
  gap: 36px;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 40px;
  /* margin-top: 40px; */
  border-top: 2px solid ${({ theme }) => theme.colorDarkGray};
  margin-bottom: 10vw;
`
const ResourceCount = styled.div`
  margin-top: 15px;
`
const InfoIcon = styled(CMS.Icon)`
  height: 1.1em;
  width: 1.1em;
  display: inline-block;
  position: relative;
  top: 0.2em;
  margin-left: 0.2em;
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

  const resourceCount = resources.reduce(
    (acc, group) => acc + group.nodes.length,
    0
  )

  const { explorePageText } = useExplorePageData()
  const theme: any = useTheme()

  return (
    <>
      <ResourceCount>
        {resourceCount} {resourceCount === 1 ? 'Result' : 'Results'}
        <Tippy content={<CMS.Text name="Sort info" data={explorePageText} />}>
          <InfoIcon name="Info alternate" color={theme.colorBlack} />
        </Tippy>
      </ResourceCount>
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
    </>
  )
}

export default ColumnSection
