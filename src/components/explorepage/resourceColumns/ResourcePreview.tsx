import React from 'react'
import { Link } from 'gatsby'
import styled, { useTheme } from 'styled-components'

import AirtableCMSIcon from '../../../airtable-cms/AirtableCMSIcon'

import { Resource } from '../../../pages/explore'
import { urlString } from '../../../airtable-cms/utilities'

const ResourceContainer = styled.section<{ expanded: boolean }>`
  background: ${({ theme }) => theme.colorVeryLightGray};
  padding: 20px;
  display: grid;
  gap: 10px;
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
      grid-template-columns: 250px 180px 100px 250px auto;`}
`
const Title = styled(Link)`
  grid-area: title;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  color: ${({ theme }) => theme.colorBlack} !important;
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
  display: flex;
  align-items: flex-start;

  gap: 8px;
`
const ResourceLink = styled.a`
  grid-area: link;
  display: flex;
  gap: 5px;
`
const LinkIcon = styled(AirtableCMSIcon)`
  width: 16px;
  height: 16px;
  margin-top: 1px;
`
const Users = styled.div`
  grid-area: users;
`
const Summary = styled.div`
  grid-area: summary;
`

const ResourcePreview: React.FC<Resource & { expand: boolean }> = ({
  data,
  expand,
}) => {
  const theme: any = useTheme()
  return (
    <ResourceContainer expanded={expand}>
      <Title
        to={
          '/resource/' +
          urlString(data.Resource_Type) +
          urlString(data.Short_Name)
        }
      >
        {data.Short_Name}
      </Title>
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
      {expand && (
        <>
          <ResourceLink>
            Link
            <LinkIcon name="External link" color={theme.colorDarker} />
          </ResourceLink>
          <Users>{data.Target_user_role}</Users>
          <Summary>{data.Short_Description}</Summary>
        </>
      )}
    </ResourceContainer>
  )
}

export default ResourcePreview
