import React from 'react'
import TabContentContainer from '../TabContentContainer'

import { PageContext } from '../../../../templates/Detail'

import { commaSeparatedList } from '../../../../utilities/grammar'

const UsersTab: React.FC<PageContext> = ({ data }) => (
  <TabContentContainer>
    <h5>TARGET USERS</h5>
    <p>{commaSeparatedList(data.Target_user_role)}</p>
    <h5>RECOMMENDED USERSHIP</h5>
    <p>{commaSeparatedList(data.Potential_user_role)}</p>
    <h5>KNOWN USERS</h5>
  </TabContentContainer>
)

export default UsersTab
