import React from 'react'
import styled from 'styled-components'

import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image'

const ThumbnailContainer = styled.div`
  grid-area: thumbnail;
  padding: 30px 15px 15px 0;
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
    Files_INTERNAL?: {
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
            }}
          />
        )}
        {data.Files_INTERNAL && (
          <>
            {/* Leaving this here to maybe add previews later */}
            {/* <iframe
              title="document preview"
              src={data.Files_INTERNAL.localFiles[0].publicURL}
            /> */}
            <a
              style={{ padding: 10 }}
              href={data.Files_INTERNAL.localFiles[0].publicURL}
            >
              Download
            </a>
          </>
        )}
      </ThumbnailContainer>
    )
  }
  return <ThumbnailContainer />
}

export default Thumbnail
