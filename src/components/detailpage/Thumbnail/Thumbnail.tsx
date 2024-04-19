import React from 'react'
import styled from 'styled-components'

import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image'
import DownloadOrAccessDropdown from '../DownloadOrAccessDropdown/DownloadOrAccessDropdown'

const ThumbnailContainer = styled.div`
  grid-area: thumbnail;
  display: flex;
  flex-direction: column;

  @media (min-width: 1000px) {
    display: block;
    padding: 30px 15px 15px 0;
    margin-top: 20px;
  }
`

const ThumbnailShadow = styled(GatsbyImage)`
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.24);
  border-radius: 5px;
`

interface ThumbnailProps {
  data: {
    Thumbnail_INTERNAL: {
      localFiles: ImageDataLike[]
    }
    Short_name: string
    Other_language_URLs: string
    URL_for_resource: string
    Resource_language?: string[]
    Primary_file?: {
      localFiles: {
        publicURL: string
        name: string
      }[]
    }
    Other_language_files_INTERNAL?: {
      localFiles: {
        publicURL: string
        name: string
      }[]
    }
  }
}

const Thumbnail = ({ data }: ThumbnailProps): JSX.Element => {
  const thumbnail = getImage(data.Thumbnail_INTERNAL?.localFiles[0])

  if (thumbnail) {
    return (
      <ThumbnailContainer>
        {thumbnail && (
          <ThumbnailShadow
            image={thumbnail}
            alt={data.Short_name + 'thumbnail image'}
            style={{
              boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.24)',
              margin: 'auto',
            }}
          />
        )}
        <DownloadOrAccessDropdown showLanguages {...{ data }} />
      </ThumbnailContainer>
    )
  }
  return <ThumbnailContainer />
}

export default Thumbnail
