import React from 'react'
import styled, { useTheme } from 'styled-components'

import { PageContext } from '../../../templates/Detail'
import IconTag from 'components/ui/IconTag/IconTag'

const HeaderContainer = styled.header`
  grid-area: header;
  padding-left: 50px;
  margin-top: 20px;
`
const IconContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  margin-top: 15px;
  gap: 20px;
`
const Author = styled.div`
  font-size: 26px;
  line-height: 32px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colorDarkGray};
`

const ShortName = styled.h6`
  margin-bottom: 20px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px !important;
  line-height: 22px;
  font-family: 'Open Sans' !important;
  margin-top: 0px !important;
`
const TagHolder = styled.div`
  display: flex;
  margin-top: 35px;
`

const Header: React.FC<PageContext> = ({ data }) => (
  <HeaderContainer>
    <h2 style={{ marginTop: 30, marginBottom: 0 }}>{data.Resource_name}</h2>
    <ShortName>[{data.Short_name.trim()}]</ShortName>
    <Author>{data.Authoring_organization[0].data.value}</Author>
    <p>{data.Short_description}</p>
    <TagHolder>
      {data.Seminal_resource === 'Yes' && (
        <IconTag dark name={'Key resource'} style={{ marginRight: '1em' }} />
      )}
      <IconTag dark name={data.Resource_type} style={{ marginRight: '1em' }} />
      {data.Access_limitations[0] === 'Restricted' && (
        <IconTag name={data.Access_method} />
      )}
    </TagHolder>
    <IconContainer>
      {data.Key_topic_area.map(name => (
        <IconTag name={name} />
      ))}
    </IconContainer>
  </HeaderContainer>
)

export default Header
