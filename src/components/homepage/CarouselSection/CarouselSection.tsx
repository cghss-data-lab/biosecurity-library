import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import styled, { useTheme } from 'styled-components'
import AirtableCMSIcon from '../../../airtable-cms/AirtableCMSIcon'
import AirtableCMSText from '../../../airtable-cms/AirtableCMSText'
import { urlString } from '../../../airtable-cms/utilities'

import useCaroselData from '../../../airtableQueryHooks/useCarouselResources'
import useHomePageData from '../../../airtableQueryHooks/useHomePageData'

import Carousel from '../../ui/Carousel/Carousel'

const H2 = styled.h2`
  text-align: center;
  margin-top: 80px !important;
`
const KeyResourceLegend = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-style: italic;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colorBlack};
`
const StyledCarousel = styled(Carousel)`
  margin-top: 30px;
`
const Card = styled.div`
  position: relative;
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
const KeyResourceFlag = styled(AirtableCMSIcon)`
  position: absolute;
  top: -5px;
  left: 15px;
  height: 60px;
  width: 60px;
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
const Title = styled.a`
  font-weight: bold !important;
  font-size: 24px !important;
  line-height: 33px !important;
  color: ${({ theme }) => theme.colorDarkest} !important;
  margin-bottom: 10px !important;
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

const getResourceUrl = (Resource_type: string, Short_name: string) =>
  'resource/' + urlString(Resource_type) + urlString(Short_name)

const truncateDescription = (
  Short_description: string,
  Resource_type: string,
  Short_name: string
) =>
  Short_description.split(' ').length > 28 ? (
    <>
      {Short_description.split(' ').slice(0, 26).join(' ')}
      ...
      <em>
        {' '}
        <a href={getResourceUrl(Resource_type, Short_name)}>read more</a>
      </em>
    </>
  ) : (
    <>{Short_description}</>
  )

const CarouselSection = (): JSX.Element => {
  const carouselResources = useCaroselData()
  const { homePageText } = useHomePageData()
  const theme: any = useTheme()

  return (
    <>
      <H2>Explore key biosafety resources</H2>
      <KeyResourceLegend>
        <AirtableCMSIcon
          name="Key resource"
          color={theme.colorOrange}
          style={{ width: 24, height: 24, marginRight: 5 }}
        />
        <AirtableCMSText name="Key resource explanation" data={homePageText} />
      </KeyResourceLegend>
      <StyledCarousel>
        {carouselResources.nodes.map(({ data: resource }) => (
          <Card>
            <KeyResourceFlag name="Key resource" color={theme.colorOrange} />
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
              <Title
                href={getResourceUrl(
                  resource.Resource_type,
                  resource.Short_name
                )}
              >
                {resource.Resource_name}
              </Title>
              <ShortName>{resource.Short_name}</ShortName>
              <Author>{resource.Authoring_organization[0].data.Name}</Author>
              <Description>
                {truncateDescription(
                  resource.Short_description,
                  resource.Resource_type,
                  resource.Short_name
                )}
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
