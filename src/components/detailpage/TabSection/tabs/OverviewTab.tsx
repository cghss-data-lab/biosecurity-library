import React from 'react'

import TabContentContainer from '../TabContentContainer'
import { PageContext } from '../../../../templates/Detail'
import { commaSeparatedList } from '../../../../utilities/grammar'
import ResourceMap from '../../ResourceMap/ResourceMap'
import { InfoTip } from '../../../ui/InfoTip'

const OverviewTab: React.FC<PageContext> = ({ data }) => {
  return (
    <TabContentContainer>
      <h5>SUMMARY</h5>
      <p>{data.Long_description}</p>
      <h5>RESOURCE TYPE</h5>
      <p>{data.Resource_type}</p>
      <h5>CATEGORIES</h5>
      <p>{commaSeparatedList(data.Key_topic_area)}</p>
      {typeof window !== 'undefined' && data.resourceMapData !== undefined && (
        <>
          {/* TODO move info tip content into CMS */}
          <h5>
            RESOURCE MAP{' '}
            <InfoTip
              content={
                <span style={{ fontFamily: `'Open Sans', sans-serif` }}>
                  Citations between resources in the biosecurity library are
                  identified using both an automated text-matching algorithm and
                  some manual review.
                </span>
              }
            />
          </h5>
          <p>
            <ResourceMap selectedNode={data} graphData={data.resourceMapData} />
          </p>
        </>
      )}
    </TabContentContainer>
  )
}

export default OverviewTab
