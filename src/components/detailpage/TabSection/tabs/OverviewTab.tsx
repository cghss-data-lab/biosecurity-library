import React from 'react'
import CMS from '@talus-analytics/library.airtable-cms'
import TabContentContainer from '../TabContentContainer'
import { PageContext } from '../../../../templates/Detail'
// import { commaSeparatedList } from '../../../../utilities/grammar'
import ResourceMapSection from '../../ResourceMapSection/ResourceMapSection'

import { useMediaQuery } from 'react-responsive'

const OverviewTab: React.FC<PageContext> = ({ data }) => {
  const tooSmallForResourceMap = useMediaQuery({ query: '(max-width: 700px)' })

  return (
    <TabContentContainer>
      {/* {typeof window !== 'undefined' && !tooSmallForResourceMap && (
        <ResourceMapSection {...{ data }} />
      )} */}
      <h5>SUMMARY</h5>
      <CMS.RenderRichText markdown={data.Long_description} />
      {/*<h5>RESOURCE TYPE</h5>
      <p>{data.Resource_type}</p>
      <h5>CATEGORIES</h5>
      <p>{commaSeparatedList(data.Key_topic_area)}</p>*/}
    </TabContentContainer>
  )
}

export default OverviewTab
