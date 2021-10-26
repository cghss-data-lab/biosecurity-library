import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import styled, { useTheme } from 'styled-components'
import AirtableCMSIcon from '../../../airtable-cms/AirtableCMSIcon'
import useCaroselData from '../../../airtableQueryHooks/useCarouselResources'

import Carousel from '../../ui/Carousel/Carousel'

const StyledCarousel = styled(Carousel)`
  margin-top: 30px;
`

const Card = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colorLightest};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  padding: 40px 90px;
  display: flex;
`
const TextContent = styled.div`
  margin-left: 15px;
`
const ResourceType = styled.div`
  display: flex;
  align-items: center;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: ${({ theme }) => theme.colorDarkest};
  margin-bottom: 24px;
`

const Title = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  color: ${({ theme }) => theme.colorDarkest};
`

const CarouselSection = (): JSX.Element => {
  const carouselResources = useCaroselData()

  const theme: any = useTheme()

  return (
    <StyledCarousel>
      {carouselResources.nodes.map(({ data: resource }) => (
        <Card>
          <div>
            {resource.Thumbnail_INTERNAL && (
              <GatsbyImage
                image={getImage(resource.Thumbnail_INTERNAL.localFiles[0])!}
                alt={resource.Short_name + 'thumbnail image'}
                style={{ width: 200 }}
              />
            )}
          </div>
          <TextContent>
            <ResourceType>
              <AirtableCMSIcon
                name={resource.Resource_type}
                color={theme.colorDarkest}
                style={{ width: 24, height: 24, marginRight: 8 }}
              />
              {resource.Resource_type}
            </ResourceType>
            <Title>{resource.Resource_name}</Title>
            <p>{resource.Short_description}</p>
          </TextContent>
        </Card>
      ))}
    </StyledCarousel>
  )
}

export default CarouselSection
