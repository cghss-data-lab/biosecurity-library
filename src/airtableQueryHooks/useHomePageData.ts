import { useStaticQuery, graphql } from 'gatsby'
import { AirtableCMSData } from '@talus-analytics/library.airtable-cms'

export interface ResourceSearchData {
  nodes: [
    {
      data: {
        Resource_name: string
        Short_name: string
        Short_description: string
        Resource_type: string
      }
    }
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
                  gatsbyImageData(height: 200, placeholder: TRACED_SVG)
                }
              }
            }
          }
        }
      }
      homePageResources: allAirtable(
        filter: { table: { eq: "Resource Library" } }
      ) {
        group(field: data___Key_topic_area) {
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
