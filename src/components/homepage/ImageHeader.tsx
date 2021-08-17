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

const ImageHeader = ({ homePageText }: { homePageText: HomePageText }) => (
  <ImageSection>
    <Image name={'Left Image'} {...{ homePageText }} />
    <Image name={'Center Image'} {...{ homePageText }} />
    <Image name={'Right Image'} {...{ homePageText }} />
  </ImageSection>
)

const Image = ({
  homePageText,
  name,
}: {
  homePageText: HomePageText
  name: string
}) => {
  const image = homePageText.nodes.find(i => i.data.Name === name)
  return (
    <StyledImage src={image.data.Attachments[0].url} alt={image.data.Alt} />
  )
}

export default ImageHeader
