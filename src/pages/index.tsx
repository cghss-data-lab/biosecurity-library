import React from 'react'
import { useStaticQuery, PageProps, graphql } from 'gatsby'

import FigmaProvider from '../figma/FigmaProvider'

import { AirtableCMSData } from '../airtable-cms/types'

import ImageHeader from '../components/homepage/ImageHeader'
import NavBar from '../components/Layout/NavBar/NavBar'
import Main from '../components/Layout/Main'
import IntroSection from '../components/homepage/IntroSection'

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
  }: { homePageText: AirtableCMSData; resourceSearchData: ResourceSearchData } =
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
          filter: { table: { eq: "Resource Library" } }
        ) {
          group(field: data___Key_Topic_Area_s_) {
            fieldValue
            totalCount
          }
        }
        resourceSearchData: allAirtable(
          filter: { table: { eq: "Resource Library" } }
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
