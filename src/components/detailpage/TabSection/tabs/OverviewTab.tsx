import React from 'react'

import TabContentContainer from '../TabContentContainer'

import { PageContext } from '../../../../templates/Detail'
import { commaSeparatedList } from '../../../../utilities/grammar'
import ResourceMap from '../../ResourceMap/ResourceMap'

const OverviewTab: React.FC<PageContext> = ({ data }) => (
  <TabContentContainer>
    <h5>SUMMARY</h5>
    <p>{data.Long_description}</p>
    <h5>RESOURCE TYPE</h5>
    <p>{data.Resource_type}</p>
    <h5>CATEGORIES</h5>
    <p>{commaSeparatedList(data.Key_topic_area)}</p>
    <h5>RESOURCE MAP</h5>
    <p>
      <ResourceMap {...{ data }} />
    </p>
  </TabContentContainer>
)

export default OverviewTab
