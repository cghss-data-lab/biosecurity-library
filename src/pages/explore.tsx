import React from 'react'
import { graphql, PageProps, useStaticQuery } from 'gatsby'

import FigmaProvider from '../figma/FigmaProvider'

import { AirtableCMSData } from '../airtable-cms/types'
import AirtableCMSText from '../airtable-cms/AirtableCMSText'

import NavBar from '../components/layout/NavBar/NavBar'
import Main from '../components/layout/Main'
import styled from 'styled-components'
import AirtableCMSImage from '../airtable-cms/AirtableCMSImage'

const BannerImage = styled(AirtableCMSImage)`
  width: calc(100% - 10px);
  margin: 5px;
`

const Header = styled.header`
  text-align: center;
`

const ExplorePage: React.FC<PageProps> = () => {
  const { explorePageText }: { explorePageText: AirtableCMSData } =
    useStaticQuery(graphql`
      query exploreQuery {
        explorePageText: allAirtable(
          filter: { table: { eq: "Explore Page" } }
        ) {
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
      }
    `)

  return (
    <FigmaProvider>
      <NavBar />
      <BannerImage name={'Banner Image'} data={explorePageText} />
      <Main>
        <Header>
          <h1>
            <AirtableCMSText name={'First Header'} data={explorePageText} />
          </h1>
        </Header>
      </Main>
    </FigmaProvider>
  )
}

export default ExplorePage
