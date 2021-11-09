/**
 * Related resources, e.g., those in the same set as the current resource
 */

import React from 'react'

import TabContentContainer from '../TabContentContainer'
import { PageContext } from '../../../../templates/Detail'
import ResourceSetSection from '../../ResourceSetSection/ResourceSetSection'

const RelatedTab: React.FC<PageContext> = ({ data }) => {
  return (
    <TabContentContainer>
      <ResourceSetSection sets={data.Resource_sets} />
    </TabContentContainer>
  )
}

export default RelatedTab
