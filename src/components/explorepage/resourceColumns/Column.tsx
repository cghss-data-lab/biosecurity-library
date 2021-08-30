import React from 'react'
import styled, { useTheme } from 'styled-components'

import AirtableCMSIcon from '../../../airtable-cms/AirtableCMSIcon'

import { ResourceGroup } from '../../../pages/explore'
import ResourcePreview from './ResourcePreview'

const ColumnContainer = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  flex-shrink: 1;
  background: ${({ theme }) => theme.colorDarkest};
  border-radius: 5px;
`

const Header = styled.header`
  color: ${({ theme }) => theme.colorWhite};
  text-align: center;
  padding: 10px;
`

const HeaderText = styled.div`
  font-family: 'Rawline', Arial, Helvetica, sans-serif;
  font-size: 20px;
  font-weight: bold;
`

const Column: React.FC<{
  name: string
  icon: string
  resources: ResourceGroup | undefined
}> = ({ name, icon, resources }) => {
  const theme: any = useTheme()
  return (
    <ColumnContainer>
      <Header>
        <AirtableCMSIcon
          name={icon}
          color={theme.colorGolden}
          hoverColor={theme.colorWhite}
          style={{ height: 30 }}
        />
        <HeaderText>{name}</HeaderText>
      </Header>
      {resources &&
        resources.nodes.map(({ data }) => (
          <ResourcePreview key={data.Short_Name} {...{ data }} />
        ))}
    </ColumnContainer>
  )
}

export default Column
