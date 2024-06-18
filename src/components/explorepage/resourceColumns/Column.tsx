import React from 'react'
import styled, { useTheme } from 'styled-components'

import CMS from 'AirtableCMS'

import { ResourceGroup } from '../../../airtableQueryHooks/useExplorePageData'
import { Expand, Return } from './ColumnButtons'

import ResourcePreview from './ResourcePreview'

const ColumnContainer = styled.div<{ expand: boolean }>`
  flex-grow: 1;
  flex-basis: 0;
  flex-shrink: 1;
  background: ${({ theme }) => theme.colorDarkest};
  border-radius: 5px;
`
const Header = styled.header`
  position: sticky;
  color: ${({ theme }) => theme.colorWhite};
  text-align: center;
  padding: 10px;
  min-height: 10em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const HeaderText = styled.div`
  /* font-family: 'Rawline', Arial, Helvetica, sans-serif;
  font-size: 20px;
  font-weight: bold; */
`
const ResourceCount = styled.div`
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 200;
`
const IconRow = styled.div`
  margin-top: 5px;
  display: grid;
  grid-template-areas: 'return icon expand';
  grid-template-columns: repeat(3, 1fr);
`

const Column: React.FC<{
  name: string
  expand: boolean
  resources: ResourceGroup
  setExpandColumn: (column: string | undefined) => void
}> = ({ name, resources, expand, setExpandColumn }) => {
  const theme: any = useTheme()
  return (
    <ColumnContainer expand={expand}>
      <Header>
        <IconRow>
          {!expand && <Expand onClick={() => setExpandColumn(name)} />}
          <CMS.Icon
            noEmitError
            name={resources.fieldValue}
            color={theme.colorGolden}
            style={{ height: 30, gridArea: 'icon' }}
          />
          {expand && <Return onClick={() => setExpandColumn(undefined)} />}
        </IconRow>
        <HeaderText>
          <h4 style={{ margin: 0 }}>{name}</h4>
        </HeaderText>
        <ResourceCount>
          {resources.nodes.length} of {resources.totalCount} resources
        </ResourceCount>
      </Header>
      {resources &&
        resources.nodes.map(({ data }) => (
          <ResourcePreview key={data.Short_name} {...{ data, expand }} />
        ))}
    </ColumnContainer>
  )
}

export default Column
