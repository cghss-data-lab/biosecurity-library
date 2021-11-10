import React, { FC } from 'react'
import { PageContext, ResourceSetProps } from '../../../templates/Detail'
import ResourceSet from './ResourceSet/ResourceSet'
import * as object from '../../../utilities/object'

interface ResourceSetSectionProps {
  sets: PageContext['data']['Resource_sets']
}
export const ResourceSetSection: FC<ResourceSetSectionProps> = ({
  sets = [],
}) => {
  const validSets: ResourceSetProps[] = (sets || [])
    .filter(s => s.data.Resources_in_set.length > 1)
    .sort(
      object.sortByCustom<ResourceSetProps>(inst => inst.data.Resource_set_name)
    )
  const numValidSets: number = validSets.length
  if (numValidSets === 0) return null
  else
    return (
      <>
        <h5>RESOURCE SETS</h5>
        <p>
          This resource appears alongside other resources in the set
          {numValidSets > 1 ? 's' : ''} below.
        </p>
        {validSets.map(s => (
          <ResourceSet
            key={s.data.Unique_ID}
            data={s.data}
            nameField={'Short_name'}
          />
        ))}
      </>
    )
}

export default ResourceSetSection
