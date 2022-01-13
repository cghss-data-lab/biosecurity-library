import { useStaticQuery, graphql } from 'gatsby'
import { ImageDataLike } from 'gatsby-plugin-image'

import { AirtableCMSData } from '@talus-analytics/library.airtable-cms'

export interface Resource {
  data: {
    Short_name: string
    Resource_name: string
    Resource_type: string
    Seminal_resource: string
    Resource_language: string[]
    Access_limitations: string[]
    Access_method: string
    Resource_format: string[]
    Key_resource_INTERNAL: true | null
    Key_topic_area: string[]
    Short_description: string
    Target_user_role: string[]
    User_types: string[]
    Authoring_organization: {
      data: {
        value: string
      }
    }[]
    Authoring_organization_type: {
      data: {
        value: string
      }
    }[]
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

const useExplorePageData = () => {
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
        distinct(field: data___Authoring_organization___data___Name)
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
              Seminal_resource
              Target_user_role
              Short_description
              Key_topic_area
              Key_resource_INTERNAL
              User_types
              Resource_language
              Access_limitations
              Access_method
              Resource_format
              Authoring_organization: Authoring_organization {
                data {
                  value: Name
                }
              }
              Authoring_organization_type: Authoring_organization {
                data {
                  value: Type
                }
              }
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

  return { explorePageText, groupedResources }
}

export default useExplorePageData
