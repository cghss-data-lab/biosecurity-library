import React, { FC } from 'react'
import { Link } from 'gatsby'
import styled, { useTheme } from 'styled-components'
import { ResourceSetProps } from '../../../../templates/Detail'
import * as object from '../../../../utilities/object'
import * as urls from '../../../../utilities/urls'
import CMS from '@talus-analytics/library.airtable-cms'
import Tippy from '@tippyjs/react'
import { followCursor } from 'tippy.js'

const ResourceSetContainer = styled.div`
  display: flex;
  flex-flow: column;
  h6 {
    margin: 2em 0 0 0;
    font-size: 18px;
    font-weight: 600;
  }
  font-family: 'Open Sans', sans-serif;
`

const ResourceList = styled.ul`
  list-style: none;
  display: grid;
  gap: 1em;
  grid-template-columns: 1fr 1fr;
  padding: 0;
`
const ResourceListItem = styled.li``
const ResourceLink = styled(Link)`
  display: flex;
  align-items: flex-start;
  width: max-content;
  svg {
    width: unset;
  }
  span {
    font-size: 1rem;
    line-height: 30px;
  }
`

export const ResourceSet: FC<ResourceSetProps> = ({ ...props }) => {
  const theme: any = useTheme()
  const nameField = props.nameField || 'Resource_name'
  return (
    <ResourceSetContainer>
      {/* Set name */}
      <h6 data-title>{props.data.Resource_set_name}</h6>

      {/* Set description (if not null) */}
      {props.data.Description !== null && (
        <p data-desc>{props.data.Description}</p>
      )}

      {/* Resources in set */}
      <ResourceList>
        {props.data.Resources_in_set.sort(
          object.sortByCustom<typeof props.data.Resources_in_set[0]>(
            inst => inst.data[nameField]
          )
        ).map(d => (
          <ResourceListItem data-member key={d.data.Record_ID_INTERNAL}>
            <Tippy
              followCursor
              delay={[500, 0]}
              content={d.data.Resource_name}
              plugins={[followCursor]}
            >
              <ResourceLink to={urls.getDetailURL(d.data)}>
                <CMS.Icon
                  name={d.data.Resource_type}
                  color={theme.colorDarker}
                  style={{ height: 30, marginRight: '.5em' }}
                />
                <span>{d.data[nameField]}</span>
              </ResourceLink>
            </Tippy>
          </ResourceListItem>
        ))}
      </ResourceList>
    </ResourceSetContainer>
  )
}

export default ResourceSet
