import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'
import useCaroselData from '../../../airtableQueryHooks/useCarouselResources'

import Carousel from '../../ui/Carousel/Carousel'

const StyledCarousel = styled(Carousel)`
  margin-top: 30px;
`

const Card = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colorLightest};
  padding: 40px 90px;
  display: flex;
`
const TextContent = styled.div`
  margin-left: 15px;
`
const Title = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: ${({ theme }) => theme.colorDarkest};
`

const CarouselSection = (): JSX.Element => {
  const carouselResources = useCaroselData()

  // console.log(carouselResources)

  return (
    <StyledCarousel>
      {carouselResources.nodes.map(({ data: resource }) => (
        <Card>
          {resource.Thumbnail_INTERNAL && (
            <GatsbyImage
              image={getImage(resource.Thumbnail_INTERNAL.localFiles[0])!}
              alt={resource.Short_name + 'thumbnail image'}
              style={{ width: 100, height: 129, flexShrink: 0, flexGrow: 0 }}
            />
          )}
          <TextContent>
            <Title>{resource.Key_topic_area}</Title>
            <Title>{resource.Resource_name}</Title>
            <p>{resource.Short_description}</p>
          </TextContent>
        </Card>
      ))}
    </StyledCarousel>
  )
}

export default CarouselSection
