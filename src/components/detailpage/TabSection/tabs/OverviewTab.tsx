import React from 'react'

import TabContentContainer from '../TabContentContainer'

import { PageContext } from '../../../../templates/detail'
import { commaSeparatedList } from '../../../../utilities/grammar'

const OverviewTab: React.FC<PageContext> = ({ data }) => (
  <TabContentContainer>
    <h5>SUMMARY</h5>
    <p>{data.Long_Description}</p>
    <h5>RESOURCE TYPE</h5>
    <p>{data.Resource_Type}</p>
    <h5>CATEGORIES</h5>
    <p>{commaSeparatedList(data.Key_Topic_Area_s_)}</p>
  </TabContentContainer>
)

export default OverviewTab
