import React from 'react'
import { graphql, PageProps, useStaticQuery } from 'gatsby'
import { ImageDataLike } from 'gatsby-plugin-image'

import FigmaProvider from '../figma/FigmaProvider'

import NavBar from '../components/layout/NavBar/NavBar'
import Main from '../components/layout/Main'
import styled from 'styled-components'
import { AirtableCMSText } from '../airtable-cms/types'
import getCMSText from '../airtable-cms/getCMSText'

const Header = styled.header`
  text-align: center;
`

const ExplorePage: React.FC<PageProps> = () => {
  const { explorePageText }: { explorePageText: AirtableCMSText } =
    useStaticQuery(graphql`
      query exploreQuery {
        explorePageText: allAirtable(
          filter: { table: { eq: "Explore Page" } }
        ) {
          nodes {
            data {
              Name
              Text
            }
          }
        }
      }
    `)

  return (
    <FigmaProvider>
      <NavBar />
      <Main>
        <Header>
          <h1>{getCMSText(explorePageText, 'First Header')}</h1>
        </Header>
      </Main>
    </FigmaProvider>
  )
}

export default ExplorePage
