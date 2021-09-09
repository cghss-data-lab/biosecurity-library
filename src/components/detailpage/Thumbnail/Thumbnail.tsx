import React from 'react'
import styled from 'styled-components'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { PageContext } from '../../../templates/detail'

const ThumbnailContainer = styled.div`
  grid-area: thumbnail;
  padding: 30px 15px 15px 0;
`

const Thumbnail: React.FC<PageContext> = ({ data }) => {
  const thumbnail = getImage(data.Thumbnail_INTERNAL?.localFiles[0])
  if (thumbnail) {
    return (
      <ThumbnailContainer>
        {thumbnail && (
          <GatsbyImage
            image={thumbnail}
            alt={data.Short_Name + 'thumbnail image'}
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
