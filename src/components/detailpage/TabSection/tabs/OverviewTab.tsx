import React from 'react'

import TabContentContainer from '../TabContentContainer'
import { PageContext } from '../../../../templates/Detail'
// import { commaSeparatedList } from '../../../../utilities/grammar'
import ResourceMapSection from '../../ResourceMapSection/ResourceMapSection'

const OverviewTab: React.FC<PageContext> = ({ data }) => {
  return (
    <TabContentContainer>
      {typeof window !== 'undefined' && <ResourceMapSection {...{ data }} />}
      <h5>SUMMARY</h5>
      <p>{data.Long_description}</p>
      {/*<h5>RESOURCE TYPE</h5>
      <p>{data.Resource_type}</p>
      <h5>CATEGORIES</h5>
      <p>{commaSeparatedList(data.Key_topic_area)}</p>*/}
    </TabContentContainer>
  )
}

export default OverviewTab
