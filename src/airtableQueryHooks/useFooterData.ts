import { useStaticQuery, graphql } from 'gatsby'
import { AirtableCMSData } from 'AirtableCMS'

const useFooterData = () => {
  const { footerData }: { footerData: AirtableCMSData } =
    useStaticQuery(graphql`
      query footerQuery {
        footerData: allAirtable(filter: { table: { eq: "Footer" } }) {
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
  return footerData
}

export default useFooterData
