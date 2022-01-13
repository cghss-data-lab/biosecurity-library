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
  font-size: 22px;
  line-height: 27px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colorDarkGray};
`

const ShortName = styled.h6`
  margin-bottom: 20px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
`
const TagHolder = styled.div`
  display: flex;
  margin-top: 35px;
`

const Header: React.FC<PageContext> = ({ data }) => {
  const theme: any = useTheme()

  console.log(data)

  return (
    <HeaderContainer>
      <h2 style={{ marginTop: 30 }}>{data.Resource_name}</h2>
      <ShortName>[{data.Short_name.trim()}]</ShortName>
      <Author>{data.Authoring_organization[0].data.value}</Author>
      <p>{data.Short_description}</p>
      <TagHolder>
        {data.Seminal_resource === 'Yes' && (
          <IconTag dark name={'Key resource'} style={{ marginRight: '1em' }} />
        )}
        <IconTag dark name={data.Resource_type} />
      </TagHolder>
      <IconContainer>
        {data.Key_topic_area.map(name => (
          <IconTag name={name} />
        ))}
      </IconContainer>
    </HeaderContainer>
  )
}

export default Header
