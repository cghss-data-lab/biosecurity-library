import React from 'react'
import styled from 'styled-components'

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

interface ImageObj {
  data: {
    Name: string
    Alt: string
    Attachments: [
      {
        url: string
      }
    ]
  }
}

const Image = ({ image }: { image: ImageObj }) => (
  <StyledImage src={image.data.Attachments[0].url} alt={image.data.Alt} />
)

const ImageHeader = ({ images }: { images: ImageObj[] }) => (
  <ImageSection>
    <Image image={images.find(i => i.data.Name === 'Left Image')} />
    <Image image={images.find(i => i.data.Name === 'Center Image')} />
    <Image image={images.find(i => i.data.Name === 'Right Image')} />
  </ImageSection>
)

export default ImageHeader
