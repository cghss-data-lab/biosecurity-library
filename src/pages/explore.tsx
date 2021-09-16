import React, { useState } from 'react'
import { graphql, PageProps, useStaticQuery } from 'gatsby'
import { ImageDataLike } from 'gatsby-plugin-image'

import FigmaProvider from '../figma/FigmaProvider'

import { AirtableCMSData } from '../airtable-cms/types'
import AirtableCMSText from '../airtable-cms/AirtableCMSText'

import { applyFilters } from '../components/explorepage/FilterBar/filterOperations'

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
    User_Roll_Up: string[]
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

export interface Definition {
  data: {
    Column: string[]
    Definition: string
    Glossary_Name: string
  }
}

export enum FilterFields {
  Target_user_role = 'Target_user_role',
  User_Roll_Up = 'User_Roll_Up',
  Authoring_Organization = 'Authoring_Organization',
  Key_Topic_Area_s_ = 'Key_Topic_Area_s_',
}

export interface ExploreState {
  defs?: string
  type?: string
  filters?: {
    [key in FilterFields]?: string[]
  }
}

const ExplorePage: React.FC<PageProps> = () => {
  const {
    explorePageText,
    groupedResources: { group: groupedResources },
    definitions: { nodes: definitions },
  }: {
    explorePageText: AirtableCMSData
    groupedResources: { group: ResourceGroup[] }
    definitions: { nodes: Definition[] }
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
              User_Roll_Up
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
      definitions: allAirtable(filter: { table: { eq: "Glossary" } }) {
        nodes {
          data {
            Glossary_Name
            Definition
            Column
          }
        }
      }
    }
  `)

  const [exploreState, setExploreState] = useState<ExploreState>({
    // defs: 'Key_Topic_Area_s_',
    // type: 'Type name',
    // filters: {
    //   Key_Topic_Area_s_: ['Risk assessment'],
    //   Authoring_Organization: [
    //     'World Health Organization (WHO)',
    //     'United States National Institutes of Health (US NIH)',
    //   ],
    // },
  })

  // const [filters, setFilters] = useState<Filter[]>([
  //   // example filters for testing, this array should
  //   // be initialized empty
  //   // {
  //   //   name: 'test',
  //   //   test: ({ data }) => data.Target_user_role.includes('Legislative leader'),
  //   // },
  //   // {
  //   //   name: 'test',
  //   //   test: node =>
  //   //     node.data.Resource_Name ===
  //   //     'Malaysian Educational Module on Responsible Conduct of Research',
  //   // },
  // ])

  let resources: ResourceGroup[] = groupedResources.map(group => ({
    ...group,
    totalCount: group.nodes.length,
  }))

  resources = applyFilters(resources, exploreState.filters)

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
        <FilterBar
          {...{
            definitions,
            exploreState,
            setExploreState,
          }}
        />
        <ActiveFilters {...{ exploreState, setExploreState }} />
        <ColumnSection {...{ resources }} />
      </Main>
    </FigmaProvider>
  )
}

export default ExplorePage
