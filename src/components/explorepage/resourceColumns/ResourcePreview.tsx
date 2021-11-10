import React from 'react'
import { Link } from 'gatsby'
import styled, { useTheme } from 'styled-components'

import AirtableCMSIcon from '../../../airtable-cms/AirtableCMSIcon'

import { Resource } from '../../../airtableQueryHooks/useExplorePageData'
import { commaSeparatedList } from '../../../utilities/grammar'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import ResourceContainer from './ResourceContainer'
import * as urls from '../../../utilities/urls'

// const ResourceContainer = styled.section<{ expanded: boolean }>`
//   background: ${({ theme }) => theme.colorVeryLightGray};
//   padding: 20px;
//   display: grid;
//   gap: 15px;
//   grid-template-areas:
//     'title'
//     'author'
//     'icons';
//   grid-template-rows: min-content 1fr;
//   border-bottom: 1px solid ${({ theme }) => theme.colorMedGray};

//   ${({ expanded }) =>
//     expanded &&
//     `grid-template-areas:
//       "image title author users summary"
//       "image icons author users summary";
//       grid-template-columns: 100px 250px 180px 250px auto;`}
// `
const Title = styled(Link)`
  grid-area: title;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  color: ${({ theme }) => theme.colorDarker} !important;
  font-weight: bold !important;
  font-size: 20px !important;
`
const Author = styled.div`
  grid-area: author;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  color: ${({ theme }) => theme.colorVeryDarkGray};
  font-weight: 500;
  font-size: 18px;
`
const IconContainer = styled.div`
  grid-area: icons;
  display: flex;
  align-items: flex-start;

  gap: 8px;
`
const Users = styled.div`
  grid-area: users;
`
const Summary = styled.div`
  grid-area: summary;
`
const ThumbnailContainer = styled.div`
  grid-area: image;
  width: 100px;
  padding-right: 15px;
`
const Thumbnail = styled(GatsbyImage)`
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.24);
`

const ResourcePreview: React.FC<Resource & { expand: boolean }> = ({
  data,
  expand,
}) => {
  const theme: any = useTheme()
  const thumbnail = getImage(data.Thumbnail_INTERNAL?.localFiles[0])
  return (
    <ResourceContainer expanded={expand}>
      {expand && (
        <ThumbnailContainer>
          {thumbnail && (
            <Thumbnail
              image={thumbnail}
              alt={data.Short_name + 'thumbnail image'}
            />
          )}
        </ThumbnailContainer>
      )}
      <Title to={urls.getDetailURL(data)}>{data.Short_name}</Title>
      <Author>{data.Authoring_organization[0].data.Name}</Author>
      <IconContainer>
        {data.Key_topic_area.map(name => (
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
          <Users>
            <p>{commaSeparatedList(data.Target_user_role)}</p>
          </Users>
          <Summary>
            <p>{data.Short_description}</p>
          </Summary>
        </>
      )}
    </ResourceContainer>
  )
}

export default ResourcePreview
