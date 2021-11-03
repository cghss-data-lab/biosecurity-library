import React, { FC } from 'react'
import { PageContext } from '../../../templates/Detail'
import { InfoTip } from '../../ui/InfoTip'
import ResourceMap from './ResourceMap/ResourceMap'

interface ResourceMapSectionProps {
  data: PageContext['data']
}
export const ResourceMapSection: FC<ResourceMapSectionProps> = ({ data }) => {
  return (
    <>
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
  )
}

export default ResourceMapSection
