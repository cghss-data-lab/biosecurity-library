import React from 'react'
import styled from 'styled-components'

import { PageContext } from '../../../templates/detail'

const HeaderContainer = styled.header`
  grid-area: header;
  padding-left: 50px;
`

const Header: React.FC<PageContext> = ({ data }) => (
  <HeaderContainer>
    <h2>{data.Resource_Name}</h2>
    <h6>[{data.Short_Name.trim()}]</h6>
    <h4>
      by{' '}
      <strong>
        <a href="#">{data.Authoring_Organization}</a>
      </strong>
    </h4>
    <p>{data.Short_Description}</p>
  </HeaderContainer>
)

export default Header
