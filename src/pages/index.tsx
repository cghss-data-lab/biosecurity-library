import React from 'react'

import { useStaticQuery, graphql } from 'gatsby'

import ImageHeader from '../components/homepage/ImageHeader'
import FigmaProvider from '../figma/FigmaProvider'
import NavBar from '../components/layout/NavBar/NavBar'
import Main from '../components/layout/Main'
import IntroSection from '../components/homepage/IntroSection'

export interface HomePageText {
  nodes: [
    {
      data: {
        Name: string
        Text: string
        Alt: string
        Attachments: [
          {
            url: string
          }
        ]
      }
    }
  ]
}

const IndexPage = () => {
  const { homePageText }: { homePageText: HomePageText } =
    useStaticQuery(graphql`
      query indexQuery {
        homePageText: allAirtable(filter: { table: { eq: "Landing Page" } }) {
          nodes {
            data {
              Name
              Text
              Alt
              Attachments {
                url
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
      }
    `)

  console.log(homePageText)

  return (
    <FigmaProvider>
      <NavBar />
      <ImageHeader {...{ homePageText }} />
      <Main>
        <IntroSection {...{ homePageText }} />
      </Main>
    </FigmaProvider>
  )
}

export default IndexPage
