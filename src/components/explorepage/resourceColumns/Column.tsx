import React from 'react'
import styled, { useTheme } from 'styled-components'

import AirtableCMSIcon from '../../../airtable-cms/AirtableCMSIcon'

import { ResourceGroup } from '../../../pages/explore'
import ResourcePreview from './ResourcePreview'

const ColumnContainer = styled.div<{ expand: boolean }>`
  flex-grow: 1;
  flex-basis: 0;
  flex-shrink: 1;
  background: ${({ theme }) => theme.colorDarkest};
  border-radius: 5px;
  /* transition: 500ms ease; */

  /* ${({ expand }) => !expand && `flex-grow: 0.000001;`} */
`
const Header = styled.header`
  color: ${({ theme }) => theme.colorWhite};
  text-align: center;
  padding: 10px;
  min-height: 10em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const HeaderText = styled.div`
  font-family: 'Rawline', Arial, Helvetica, sans-serif;
  font-size: 20px;
  font-weight: bold;
`
const ResourceCount = styled.div`
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 200;
`
const ExpandButton = styled.button`
  border: none;
  background: none;
  margin-left: auto;
`
const ReturnButton = styled.button`
  border: none;
  background: none;
  margin-right: auto;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colorWhite};
`

const Column: React.FC<{
  name: string
  expand: boolean
  resources: ResourceGroup
  setExpandColumn: React.Dispatch<React.SetStateAction<string | undefined>>
}> = ({ name, resources, expand, setExpandColumn }) => {
  const theme: any = useTheme()
  return (
    <ColumnContainer expand={expand}>
      <Header>
        {!expand && (
          <ExpandButton onClick={() => setExpandColumn(name)}>
            <AirtableCMSIcon
              name="Expand column"
              color={theme.colorWhite}
              hoverColor={theme.colorGolden}
            />
          </ExpandButton>
        )}
        {expand && (
          <ReturnButton onClick={() => setExpandColumn(undefined)}>
            <AirtableCMSIcon
              name="Return"
              color={theme.colorWhite}
              hoverColor={theme.colorOrange}
            />
            Return to all
          </ReturnButton>
        )}
        <AirtableCMSIcon
          name={resources.fieldValue}
          color={theme.colorGolden}
          style={{ height: 30 }}
        />
        <HeaderText>{name}</HeaderText>
        <ResourceCount>
          {resources.nodes.length} of {resources.totalCount} resources
        </ResourceCount>
      </Header>
      {resources &&
        resources.nodes.map(({ data }) => (
          <ResourcePreview key={data.Short_Name} {...{ data, expand }} />
        ))}
    </ColumnContainer>
  )
}

export default Column
