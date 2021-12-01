import React from 'react'
import styled, { useTheme } from 'styled-components'

import CMS from '@talus-analytics/library.airtable-cms'

import { PageContext } from '../../../templates/Detail'
import IconTag from 'components/ui/IconTag/IconTag'

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
      <IconTag dark name={data.Resource_type} style={{ marginTop: 35 }} />
      <p>{data.Short_description}</p>
      <IconContainer>
        {data.Key_topic_area.map(name => (
          <CMS.Icon
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
