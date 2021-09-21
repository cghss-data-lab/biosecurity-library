import React from 'react'
import styled, { useTheme } from 'styled-components'
import AirtableCMSIcon from '../../../airtable-cms/AirtableCMSIcon'

import { PageContext } from '../../../templates/Detail'

const HeaderContainer = styled.header`
  grid-area: header;
  padding-left: 50px;
`
const IconContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  gap: 20px;
`

const Header: React.FC<PageContext> = ({ data }) => {
  const theme: any = useTheme()
  return (
    <HeaderContainer>
      <h2>{data.Unique_ID}</h2>
      <h6>[{data.Short_Name.trim()}]</h6>
      <h4>
        by{' '}
        <strong>
          <a href="/">{data.Authoring_Organization}</a>
        </strong>
      </h4>
      <p>{data.Short_Description}</p>
      <IconContainer>
        {JSON.parse(data.Topic_Area_Icons).map((name: string) => (
          <AirtableCMSIcon
            key={name}
            name={name}
            color={theme.colorOrange}
            style={{ width: 30 }}
          />
        ))}
      </IconContainer>
    </HeaderContainer>
  )
}

export default Header
