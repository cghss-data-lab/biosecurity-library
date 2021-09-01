import React, { useState } from 'react'
import { graphql, PageProps, useStaticQuery } from 'gatsby'
import { ImageDataLike } from 'gatsby-plugin-image'

import FigmaProvider from '../figma/FigmaProvider'

import { AirtableCMSData } from '../airtable-cms/types'
import AirtableCMSText from '../airtable-cms/AirtableCMSText'

import NavBar from '../components/layout/NavBar/NavBar'
import Main from '../components/layout/Main'
import styled from 'styled-components'
import AirtableCMSImage from '../airtable-cms/AirtableCMSImage'
import ColumnSection from '../components/explorepage/resourceColumns/ColumnSection'
import FilterBar from '../components/explorepage/FilterBar/FilterBar'
import ActiveFilters from '../components/explorepage/FilterBar/ActiveFilters'

const BannerImage = styled(AirtableCMSImage)`
  width: calc(100% - 10px);
  margin: 5px;
`
const Header = styled.header`
  text-align: center;
`

export interface Resource {
  data: {
    Short_Name: string
    Resource_Name: string
    Resource_Type: string
    Authoring_Organization: string
    Key_Resource_INTERNAL: true | null
    Key_Topic_Area_s_: string[]
    Short_Description: string
    Target_user_role: string[]
    Recommended_usership: string
    Topic_Area_Icons: string
    Thumbnail_INTERNAL: {
      localFiles: ImageDataLike[]
    }
  }
}

export interface ResourceGroup {
  fieldValue: string
  nodes: Resource[]
  totalCount?: number
}

export interface Filter {
  name: string
  test: (data: ResourceGroup['nodes'][0]) => boolean
}

const ExplorePage: React.FC<PageProps> = () => {
  const {
    explorePageText,
    groupedResources: { group: groupedResources },
  }: {
    explorePageText: AirtableCMSData
    groupedResources: { group: ResourceGroup[] }
  } = useStaticQuery(graphql`
    query exploreQuery {
      explorePageText: allAirtable(filter: { table: { eq: "Explore Page" } }) {
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
      authorizingOrganization: allAirtable(
        filter: { table: { eq: "Resource Library" } }
      ) {
        distinct(field: data___Authoring_Organization)
      }
      groupedResources: allAirtable(
        filter: { table: { eq: "Resource Library" } }
      ) {
        group(field: data___Resource_Type) {
          nodes {
            data {
              Short_Name
              Resource_Name
              Resource_Type
              Authoring_Organization
              Target_user_role
              Short_Description
              Key_Topic_Area_s_
              Key_Resource_INTERNAL_
              Recommended_usership
              Topic_Area_Icons
              Thumbnail_INTERNAL {
                localFiles {
                  childImageSharp {
                    gatsbyImageData(width: 100, placeholder: BLURRED)
                  }
                }
              }
            }
          }
          fieldValue
        }
      }
    }
  `)

  const [filters, setFilters] = useState<Filter[]>([
    // example filters for testing, this array should
    // be initialized empty
    // {
    //   name: 'test',
    //   test: ({ data }) => data.Target_user_role.includes('Legislative leader'),
    // },
    // {
    //   name: 'test',
    //   test: node =>
    //     node.data.Resource_Name ===
    //     'Malaysian Educational Module on Responsible Conduct of Research',
    // },
  ])

  let resources = groupedResources.map(group => ({
    ...group,
    totalCount: group.nodes.length,
  }))

  if (filters.length > 0) {
    resources = filters.reduce(
      (prev, filter) =>
        prev.map(group => ({
          ...group,
          nodes: group.nodes.filter(filter.test),
        })),
      resources
    )
  }

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
        <FilterBar {...{ filters, setFilters }} />
        <ActiveFilters {...{ filters, setFilters }} />
        <ColumnSection {...{ resources }} />
      </Main>
    </FigmaProvider>
  )
}

export default ExplorePage
