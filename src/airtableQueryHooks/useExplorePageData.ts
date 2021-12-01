import { useStaticQuery, graphql } from 'gatsby'
import { ImageDataLike } from 'gatsby-plugin-image'

import { AirtableCMSData } from '@talus-analytics/library.airtable-cms'

export interface Resource {
  data: {
    Short_name: string
    Resource_name: string
    Resource_type: string
    Seminal_resource: string
    Authoring_organization: {
      data: {
        Name: string
      }
    }[]
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
              Authoring_organization {
                data {
                  Name
                }
              }
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
    }
  `)

  return { explorePageText, groupedResources }
}

export default useExplorePageData
