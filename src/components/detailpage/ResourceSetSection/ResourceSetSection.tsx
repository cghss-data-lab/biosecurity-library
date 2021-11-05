import React, { FC } from 'react'
import { PageContext, ResourceSetProps } from '../../../templates/Detail'
import ResourceSet from './ResourceSet/ResourceSet'

interface ResourceSetSectionProps {
  sets: PageContext['data']['Resource_sets']
}
export const ResourceSetSection: FC<ResourceSetSectionProps> = ({
  sets = [],
}) => {
  const validSets: ResourceSetProps[] = (sets || []).filter(
    s => s.data.Resources_in_set.length > 1
  )
  if (validSets.length === 0) return null
  else
    return (
      <>
        <h5>RESOURCE SETS</h5>
        <p>
          This resource appears alongside other resources in the sets below.
        </p>
        {validSets.map(s => (
          <ResourceSet key={s.data.Unique_ID} data={s.data} />
        ))}
      </>
    )
}

export default ResourceSetSection
