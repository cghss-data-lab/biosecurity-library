import React from 'react'
import styled from 'styled-components'

import { PageContext } from '../../../../templates/detail'
import { commaSeparatedList } from '../../../../utilities/grammar'

const ContentSection = styled.section`
  grid-area: content;
  padding: 15px;
  border-top: 1px solid ${({ theme }) => theme.colorMedGray};
  border-left: 1px solid ${({ theme }) => theme.colorMedGray};
`

const UsersTab: React.FC<PageContext> = ({ data }) => (
  <ContentSection>
    <h5>TARGET USERS</h5>
    <p>{commaSeparatedList(data.Target_user_role)}</p>
    <h5>RECOMMENDED USERSHIP</h5>
    <p>{commaSeparatedList(data.Potential_user_role)}</p>
    <h5>KNOWN USERS</h5>
  </ContentSection>
)

export default UsersTab
