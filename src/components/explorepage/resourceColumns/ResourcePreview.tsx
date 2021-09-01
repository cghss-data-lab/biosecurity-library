import React from 'react'
import { Link } from 'gatsby'
import styled, { useTheme } from 'styled-components'

import AirtableCMSIcon from '../../../airtable-cms/AirtableCMSIcon'

import { Resource } from '../../../pages/explore'
import { urlString } from '../../../airtable-cms/utilities'

const ResourceContainer = styled(Link)<{ expanded: boolean }>`
  background: ${({ theme }) => theme.colorVeryLightGray};
  padding: 20px;
  display: grid;
  grid-template-areas:
    'title'
    'author'
    'icons';

  border-bottom: 1px solid ${({ theme }) => theme.colorMedGray};

  ${({ expanded }) =>
    expanded &&
    `grid-template-areas: 
      "title author link users summary"
      "icons author link users summary";
      grid-template-columns: 250px 200px 150px 200px auto;`}
`
const Title = styled.div`
  grid-area: title;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  color: ${({ theme }) => theme.colorBlack};
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 8px;
`
const Author = styled.div`
  grid-area: author;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  color: ${({ theme }) => theme.colorVeryDarkGray};
  font-weight: 500;
  font-size: 16px;
`
const IconContainer = styled.div`
  grid-area: icons;
  padding-top: 10px;
  padding-bottom: 15px;
  display: flex;
  gap: 8px;
`

const ResourcePreview: React.FC<Resource & { expand: boolean }> = ({
  data,
  expand,
}) => {
  const theme: any = useTheme()
  return (
    <ResourceContainer
      expanded={expand}
      to={
        '/resource/' +
        urlString(data.Resource_Type) +
        urlString(data.Short_Name)
      }
    >
      <Title>{data.Short_Name}</Title>
      <Author>{data.Authoring_Organization}</Author>
      <IconContainer>
        {JSON.parse(data.Topic_Area_Icons).map((name: string) => (
          <AirtableCMSIcon
            key={name}
            name={name}
            color={theme.colorDarkest}
            style={{ width: 30 }}
          />
        ))}
      </IconContainer>
    </ResourceContainer>
  )
}

export default ResourcePreview
