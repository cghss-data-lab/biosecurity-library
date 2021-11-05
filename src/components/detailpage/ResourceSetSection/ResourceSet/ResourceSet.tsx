import React, { FC } from 'react'
import styled from 'styled-components'
import { ResourceSetProps } from '../../../../templates/Detail'

const ResourceSetContainer = styled.div`
  display: flex;
  flex-flow: column;
`

export const ResourceSet: FC<ResourceSetProps> = ({ ...props }) => {
  return (
    <ResourceSetContainer>
      {/* Set name */}
      <h3 data-title>{props.data.Resource_set_name}</h3>

      {/* Set description (if not null) */}
      {props.data.Description !== null && (
        <p data-desc>{props.data.Description}</p>
      )}

      {/* Docs in set */}
      <ul>
        {props.data.Resources_in_set.map(d => (
          <li data-member key={d.data.Record_ID_INTERNAL}>
            {d.data.Resource_name}
          </li>
        ))}
      </ul>
    </ResourceSetContainer>
  )
}

export default ResourceSet
