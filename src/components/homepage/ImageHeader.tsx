import React from 'react'
import styled from 'styled-components'

import { HomePageText } from '../../pages'

const ImageSection = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: 100%;
  overflow: hidden;
`
const StyledImage = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
`

const ImageHeader: React.FC<{ homePageText: HomePageText }> = ({
  homePageText,
}) => (
  <ImageSection>
    <Image name={'Left Image'} {...{ homePageText }} />
    <Image name={'Center Image'} {...{ homePageText }} />
    <Image name={'Right Image'} {...{ homePageText }} />
  </ImageSection>
)

const Image: React.FC<{
  homePageText: HomePageText
  name: string
}> = ({ homePageText, name }) => {
  const image = homePageText.nodes.find(i => i.data.Name === name)

  if (image) {
    return (
      <StyledImage src={image.data.Attachments[0].url} alt={image.data.Alt} />
    )
  }
  throw new Error(`Image ${name} not found.`)
}

export default ImageHeader
