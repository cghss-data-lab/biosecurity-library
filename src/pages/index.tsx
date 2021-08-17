import React from 'react'

import { useStaticQuery, graphql } from 'gatsby'

import ImageHeader from '../components/homepage/ImageHeader'
import FigmaProvider from '../figma/FigmaProvider'
import NavBar from '../components/layout/NavBar/NavBar'
import Main from '../components/layout/Main'

const IndexPage = () => {
  const data = useStaticQuery(graphql`
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

  return (
    <FigmaProvider>
      <NavBar />
      <ImageHeader
        images={data.homePageText.nodes.filter(n =>
          n.data.Name.includes('Image')
        )}
      />
      <Main>
        <h1>Talus Analytics Gatsby Starter</h1>
        <p>
          {/* {airtableData.Notes.trim()}, from{' '}
        <a href={airtableData.url}>this table.</a> */}
        </p>
      </Main>
    </FigmaProvider>
  )
}

export default IndexPage
