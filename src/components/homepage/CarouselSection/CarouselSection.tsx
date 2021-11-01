import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import styled, { useTheme } from 'styled-components'
import AirtableCMSIcon from '../../../airtable-cms/AirtableCMSIcon'
import useCaroselData from '../../../airtableQueryHooks/useCarouselResources'

import Carousel from '../../ui/Carousel/Carousel'

const H2 = styled.h2`
  text-align: center;
  margin-top: 80px !important;
`
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
  /* min-height: 575px; */
  /* min-height: 500px; */
  min-height: 385px;
`
const TextContent = styled.div`
  margin-left: 15px;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;
`
const ResourceType = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 19px;
  color: ${({ theme }) => theme.colorDarkest};
  margin-bottom: 24px;
`
const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  color: ${({ theme }) => theme.colorDarkest};
  margin-bottom: 10px;
`
const ShortName = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 20px;
`
const Author = styled.div`
  font-size: 20px;
  line-height: 27px;
  margin-bottom: 20px;
`
const Description = styled.p`
  font-size: 18px;
  line-height: 28px;
`
const KeyTopicArea = styled.div`
  display: flex;
`

const CarouselSection = (): JSX.Element => {
  const carouselResources = useCaroselData()
  const theme: any = useTheme()

  return (
    <>
      <H2>Explore key biosafety resources</H2>
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
              <ShortName>{resource.Short_name}</ShortName>
              <Author>{resource.Authoring_organization[0].data.Name}</Author>
              <Description>
                {resource.Short_description.split(' ').slice(0, 25).join(' ')}
                ...
                <em> read more</em>
              </Description>
              <KeyTopicArea>
                {resource.Key_topic_area.map(topic => (
                  <AirtableCMSIcon
                    noEmitError
                    name={topic}
                    color={theme.colorDarkest}
                  />
                ))}
              </KeyTopicArea>
            </TextContent>
          </Card>
        ))}
      </StyledCarousel>
    </>
  )
}

export default CarouselSection
