import React from 'react'
import styled from 'styled-components'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { PageContext } from '../../../templates/detail'

const ThumbnailContainer = styled.div`
  grid-area: thumbnail;
  padding: 30px 15px 15px 0;
`

const Thumbnail: React.FC<PageContext> = ({ data }) => {
  console.log(data)
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
      </ThumbnailContainer>
    )
  }
  return <ThumbnailContainer />
}

export default Thumbnail
