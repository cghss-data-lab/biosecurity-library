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
  interface ResourceGroup {
    group: [
      {
        fieldValue: string
        nodes: [
          {
            data: {
              Authoring_Organization: string
              Key_Resource_INTERNAL: true | null
              Key_Topic_Area_s_: string[]
              Resource_Name: string
              Short_Description: string
              Target_user_role: string[]
            }
          }
        ]
      }
    ]
  }

  const {
    explorePageText,
    groupedResources,
  }: { explorePageText: AirtableCMSData; groupedResources: ResourceGroup } =
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
        exploreTopics: allAirtable(
          filter: {
            table: { eq: "Resource Library" }
            data: { Publish_INTERNAL: { eq: true } }
          }
        ) {
          distinct(field: data___Resource_Type)
        }
        keyTopicAreas: allAirtable(
          filter: {
            table: { eq: "Resource Library" }
            data: { Publish_INTERNAL: { eq: true } }
          }
        ) {
          distinct(field: data___Key_Topic_Area_s_)
        }
        userRoles: allAirtable(
          filter: {
            table: { eq: "Resource Library" }
            data: { Publish_INTERNAL: { eq: true } }
          }
        ) {
          distinct(field: data___Target_user_role)
        }
        authorizingOrganization: allAirtable(
          filter: {
            table: { eq: "Resource Library" }
            data: { Publish_INTERNAL: { eq: true } }
          }
        ) {
          distinct(field: data___Authoring_Organization)
        }
        groupedResources: allAirtable(
          filter: {
            table: { eq: "Resource Library" }
            data: { Publish_INTERNAL: { eq: true } }
          }
        ) {
          group(field: data___Resource_Type) {
            nodes {
              data {
                Resource_Name
                Authoring_Organization
                Target_user_role
                Short_Description
                Key_Topic_Area_s_
                Key_Resource_INTERNAL_
              }
            }
            fieldValue
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
