import React, { FC } from 'react'
import { PageContext } from '../../../templates/Detail'
// import { InfoTip } from '../../ui/InfoTip'
import ResourceMap from './ResourceMap/ResourceMap'

interface ResourceMapSectionProps {
  data: PageContext['data']
}
export const ResourceMapSection: FC<ResourceMapSectionProps> = ({ data }) => {
  const showMap: boolean =
    data.resourceMapData !== undefined &&
    data.resourceMapData.links.length > 0 &&
    data.resourceMapData.nodes.length > 1
  return (
    <>
      <h5>
        RESOURCE MAP{' '}
        {/* <InfoTip
          content={
            <span style={{ fontFamily: `'Open Sans', sans-serif` }}>
              Citations between resources in the biosecurity library are
              identified using both an automated text-matching algorithm and
              some manual review.
            </span>
          }
        /> */}
      </h5>
      {showMap && (
        <div>
          <ResourceMap selectedNode={data} graphData={data.resourceMapData} />
        </div>
      )}
      {!showMap && (
        <p>
          This resource is not currently known to cite or be cited by any other
          resources in the library.
        </p>
      )}
    </>
  )
}

export default ResourceMapSection
