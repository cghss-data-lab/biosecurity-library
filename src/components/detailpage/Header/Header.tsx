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
  margin-top: 15px;
  gap: 20px;
`
const Author = styled.h4`
  font-style: normal !important;
  font-weight: bold !important;
  font-size: 24px !important;
  line-height: 33px;
  margin-top: 20px;
  margin-bottom: 20px !important;
  color: ${({ theme }) => theme.colorVeryDarkGray};
`

const ShortName = styled.h6`
  margin-bottom: 20px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
`

const Header: React.FC<PageContext> = ({ data }) => {
  const theme: any = useTheme()

  console.log(data)

  return (
    <HeaderContainer>
      <IconTag dark name={data.Resource_type} style={{ marginTop: 35 }} />
      <h2 style={{ marginTop: 20 }}>{data.Resource_name}</h2>
      <ShortName>[{data.Short_name.trim()}]</ShortName>
      <Author>{data.Authoring_organization[0].data.Name}</Author>
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
