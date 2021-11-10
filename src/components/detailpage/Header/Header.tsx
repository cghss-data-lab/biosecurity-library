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
      <h4>{data.Authoring_organization[0].data.Name}</h4>
      <p>{data.Short_description}</p>
      <IconContainer>
        {data.Key_topic_area.map(name => (
          <AirtableCMSIcon
            noEmitError
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
