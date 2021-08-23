import React from 'react'

import { useStaticQuery, PageProps, graphql } from 'gatsby'

import ImageHeader from '../components/homepage/ImageHeader'
import FigmaProvider from '../figma/FigmaProvider'
import NavBar from '../components/layout/NavBar/NavBar'
import Main from '../components/layout/Main'
import IntroSection from '../components/homepage/IntroSection'
import { ImageDataLike } from 'gatsby-plugin-image'

export interface HomePageText {
  nodes: [
    {
      data: {
        Name: string
        Text: string
        Image: {
          localFiles: ImageDataLike[]
        }
      }
    }
  ]
}

export interface ResourceSearchData {
  nodes: [
    {
      data: {
        Resource_Name: string
        Short_Name: string
        Description: string
        Resource_Type: string
      }
    }
  ]
}

const IndexPage: React.FC<PageProps> = () => {
  const {
    homePageText,
    resourceSearchData,
  }: { homePageText: HomePageText; resourceSearchData: ResourceSearchData } =
    useStaticQuery(graphql`
      query indexQuery {
        homePageText: allAirtable(filter: { table: { eq: "Landing Page" } }) {
          nodes {
            data {
              Name
              Text
              Image {
                localFiles {
                  childImageSharp {
                    gatsbyImageData(height: 200, placeholder: TRACED_SVG)
                  }
                }
              }
            }
          }
        }
        homePageResources: allAirtable(
          filter: {
            table: { eq: "Resource Library" }
            data: { Publish_INTERNAL: { eq: true } }
          }
        ) {
          group(field: data___Key_Topic_Area_s_) {
            fieldValue
            totalCount
          }
        }
        resourceSearchData: allAirtable(
          filter: {
            table: { eq: "Resource Library" }
            data: { Publish_INTERNAL: { eq: true } }
          }
        ) {
          nodes {
            data {
              Resource_Name
              Resource_Type
              Short_Name
              Short_Description
            }
          }
        }
      }
    `)

  console.log(homePageText)

  return (
    <FigmaProvider>
      <NavBar />
      <ImageHeader {...{ homePageText }} />
      <Main>
        <IntroSection {...{ homePageText, resourceSearchData }} />
      </Main>
    </FigmaProvider>
  )
}

export default IndexPage
