import { useStaticQuery, graphql } from 'gatsby'
import { AirtableCMSData } from '@talus-analytics/library.airtable.cms-types'

const useAboutPageData = () => {
  const {
    aboutPageData,
  }: {
    aboutPageData: AirtableCMSData
  } = useStaticQuery(graphql`
    query aboutQuery {
      aboutPageData: allAirtable(filter: { table: { eq: "About Page" } }) {
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
    }
  `)

  return aboutPageData
}

export default useAboutPageData
