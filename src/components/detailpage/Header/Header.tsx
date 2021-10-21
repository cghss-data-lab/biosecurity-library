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
      <h2>{data.Resource_name}</h2>
      <h6>[{data.Short_name.trim()}]</h6>
      <h4>
        by{' '}
        <strong>
          <a href="/">{data.Authoring_organization[0].data.Name}</a>
        </strong>
      </h4>
      <p>{data.Short_description}</p>
      <IconContainer>
        {/* {JSON.parse(data.Topic_area_icons).map((name: string) => (
          <AirtableCMSIcon
            key={name}
            name={name}
            color={theme.colorOrange}
            style={{ width: 30 }}
          />
        ))} */}
        {data.Key_topic_area.map(name => (
          <AirtableCMSIcon
            key={name}
            name={name}
            color={theme.colorDarkest}
            style={{ width: 30 }}
          />
        ))}
      </IconContainer>
    </HeaderContainer>
  )
}

export default Header
