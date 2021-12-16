import CMS from 'AirtableCMS'
import useDefinitions from 'airtableQueryHooks/useDefinitions'
import React from 'react'
import styled, { useTheme } from 'styled-components'

const Container = styled.div`
  background-color: ${({ theme }) => theme.colorWhite};
  border-radius: 5px;
  overflow: hidden;
  margin: -5px -9px;
`
const Header = styled.header`
  background-color: ${({ theme }) => theme.colorVeryLightGray};
  color: ${({ theme }) => theme.colorOrange};
  display: flex;
  align-items: center;
  padding: 15px;
  font-family: 'Overpass', Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 26px;
  line-height: 32px;
`
const Content = styled.section`
  padding: 15px;
  color: ${({ theme }) => theme.colorBlack};
`
const DefinitionHeader = styled.div`
  font-size: 16px;
  font-weight: 600;
`
const Definition = styled.div`
  font-size: 16px;
  margin-top: 10px;
  color: black;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
`
const CTA = styled(Definition)`
  font-style: italic;
  color: ${({ theme }) => theme.colorOrange};
`

interface BarPopupProps {
  barName: string
}

const BarPopup = ({ barName }: BarPopupProps): JSX.Element => {
  const theme: any = useTheme()

  const definitions = useDefinitions()
  const definition = definitions.find(
    def => def.data.Name.trim() === barName.trim()
  )?.data.Definition

  return (
    <Container>
      <Header>
        <CMS.Icon
          name={barName}
          color={theme.colorGolden}
          style={{ height: 40, marginRight: 10 }}
        />
        {barName}
      </Header>
      {definition && (
        <Content>
          <DefinitionHeader>About this topic</DefinitionHeader>
          <Definition>{definition}</Definition>
          <CTA>Click to explore topic</CTA>
        </Content>
      )}
    </Container>
  )
}

export default BarPopup
