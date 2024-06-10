import { useStaticQuery, graphql } from 'gatsby'
import { AirtableCMSData } from 'AirtableCMS'

export interface ResourceSearchData {
  nodes: [
    {
      data: {
        Resource_name: string
        Short_name: string
        Short_description: string
        Resource_type: string
      }
    },
  ]
}

export interface HomePageResources {
  group: {
    fieldValue: string
    totalCount: number
  }[]
}

const useHomePageData = () => {
  const {
    homePageText,
    resourceSearchData,
    homePageResources,
  }: {
    homePageText: AirtableCMSData
    resourceSearchData: ResourceSearchData
    homePageResources: HomePageResources
  } = useStaticQuery(graphql`
    query indexQuery {
      homePageText: allAirtable(filter: { table: { eq: "Landing Page" } }) {
        nodes {
          data {
            Name
            Text
            Image {
              localFiles {
                childImageSharp {
                  gatsbyImageData(height: 200, placeholder: BLURRED)
                }
              }
            }
          }
        }
      }
      homePageResources: allAirtable(
        filter: { table: { eq: "Resource Library" } }
      ) {
        group(field: data___Key_topic_area___data___Name) {
          fieldValue
          totalCount
        }
      }
      resourceSearchData: allAirtable(
        filter: { table: { eq: "Resource Library" } }
      ) {
        nodes {
          data {
            Resource_name
            Resource_type
            Short_name
            Short_description
          }
        }
      }
    }
  `)

  return { homePageText, homePageResources, resourceSearchData }
}

export default useHomePageData
