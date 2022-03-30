import React from 'react'
import styled, { useTheme } from 'styled-components'

import { ResourceGroup } from 'airtableQueryHooks/useExplorePageData'
import CMS from 'AirtableCMS'
import Dropdown from 'components/ui/Dropdown'
import ResourcePreview from '../ResourcePreview'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex-grow: 1;
  flex-basis: 100%;
  align-items: center;
`

const ColumnHolder = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
`
const Header = styled.button`
  background: none;
  border: none;
  position: relative;
  color: ${({ theme }) => theme.colorWhite};
  text-align: center;
  padding: 20px 10px;
  /* min-height: 10em; */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: ${({ theme }) => theme.colorDarkest};
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

interface MobileColumnsProps {
  resourceGroups: ResourceGroup[]
}

const MobileColumns = ({ resourceGroups }: MobileColumnsProps) => {
  const theme: any = useTheme()
  return (
    <Container>
      {resourceGroups
        .sort((a, b) => (b.nodes.length ?? 0) - (a.nodes.length ?? 0))
        .map(group => (
          <ColumnHolder>
            <Dropdown
              floating={false}
              renderButton={() => (
                <Header>
                  <IconRow>
                    <CMS.Icon
                      noEmitError
                      name={group.fieldValue}
                      color={theme.colorGolden}
                      style={{ height: 30, gridArea: 'icon' }}
                    />
                  </IconRow>
                  <HeaderText>
                    <h4 style={{ margin: 0 }}>{group.fieldValue}</h4>
                  </HeaderText>
                  <ResourceCount>
                    {group.nodes.length} of {group.totalCount} resources
                  </ResourceCount>
                </Header>
              )}
            >
              {group &&
                group.nodes.map(({ data }) => (
                  <ResourcePreview
                    key={data.Short_name}
                    {...{ data, expand: false }}
                  />
                ))}
            </Dropdown>
          </ColumnHolder>
        ))}
    </Container>
  )
}

export default MobileColumns
