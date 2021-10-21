import { useStaticQuery, graphql } from 'gatsby'
import { ImageDataLike } from 'gatsby-plugin-image'

export interface CaroselResourceData {
  nodes: {
    data: {
      Resource_name: string
      Short_name: string
      Short_description: string
      Resource_type: string
      Authoring_organization: {
        data: {
          Name: string
        }
      }[]
      Key_topic_area: string[]
      Thumbnail_INTERNAL: {
        localFiles: ImageDataLike[]
      }
    }
  }[]
}

const useCaroselData = (): CaroselResourceData => {
  const { caroselResources }: { caroselResources: CaroselResourceData } =
    useStaticQuery(graphql`
      query caroselResourcesQuery {
        caroselResources: allAirtable(
          filter: {
            table: { eq: "Resource Library" }
            data: { Key_resource_INTERNAL: { eq: true } }
          }
        ) {
          nodes {
            data {
              Short_name
              Resource_name
              Resource_type
              Short_description
              Key_topic_area
              Key_resource_INTERNAL
              User_roll_up
              Authoring_organization {
                data {
                  Name
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
        }
      }
    `)
  return caroselResources
}

export default useCaroselData
