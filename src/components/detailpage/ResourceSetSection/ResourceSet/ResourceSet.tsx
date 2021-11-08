import React, { FC } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { ResourceSetProps } from '../../../../templates/Detail'
import * as object from '../../../../utilities/object'
import * as urls from '../../../../utilities/urls'

const ResourceSetContainer = styled.div`
  display: flex;
  flex-flow: column;
  h6 {
    margin: 1em 0 0 0;
    font-size: 18px;
    font-weight: 600;
  }
  font-family: 'Open Sans', sans-serif;
`

export const ResourceSet: FC<ResourceSetProps> = ({ ...props }) => {
  return (
    <ResourceSetContainer>
      {/* Set name */}
      <h6 data-title>{props.data.Resource_set_name}</h6>

      {/* Set description (if not null) */}
      {props.data.Description !== null && (
        <p data-desc>{props.data.Description}</p>
      )}

      {/* Resources in set */}
      <ul>
        {props.data.Resources_in_set.sort(
          object.sortByCustom<typeof props.data.Resources_in_set[0]>(
            inst => inst.data.Resource_name
          )
        ).map(d => (
          <li data-member key={d.data.Record_ID_INTERNAL}>
            <Link to={urls.getDetailURL(d.data)}>{d.data.Resource_name}</Link>
          </li>
        ))}
      </ul>
    </ResourceSetContainer>
  )
}

export default ResourceSet
