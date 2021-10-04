import { useStaticQuery, graphql } from 'gatsby'
import { ImageDataLike } from 'gatsby-plugin-image'
import { AirtableCMSData } from '../airtable-cms/types'

export interface Resource {
  data: {
    Short_name: string
    Resource_name: string
    Resource_type: string
    Authoring_organization: string
    Key_resource_INTERNAL: true | null
    Key_topic_area: string[]
    Short_description: string
    Target_user_role: string[]
    User_roll_up: string[]
    Thumbnail_INTERNAL: {
      localFiles: ImageDataLike[]
    }
  }
}

// removing:
// Topic_area_icons: string

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
        distinct(field: data___Authoring_organization)
      }
      groupedResources: allAirtable(
        filter: { table: { eq: "Resource Library" } }
      ) {
        group(field: data___Resource_type) {
          nodes {
            data {
              Short_name
              Resource_name
              Resource_type
              Authoring_organization
              Target_user_role
              Short_description
              Key_topic_area
              Key_resource_INTERNAL
              User_roll_up
              # Topic_area_icons
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
