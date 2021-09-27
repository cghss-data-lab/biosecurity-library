import { useStaticQuery, graphql } from 'gatsby'
import { ImageDataLike } from 'gatsby-plugin-image'
import { AirtableCMSData } from '../airtable-cms/types'

export interface Resource {
  data: {
    Short_Name: string
    Unique_ID: string
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

const useExplorePageData = () => {
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
              Unique_ID
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

  return { explorePageText, groupedResources, definitions }
}

export default useExplorePageData
