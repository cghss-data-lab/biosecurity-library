import { useStaticQuery, graphql } from 'gatsby'
import { AirtableCMSData } from 'AirtableCMS'

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
            Download {
              localFiles {
                name
                prettySize
                publicURL
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
