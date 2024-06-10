import { useStaticQuery, graphql } from 'gatsby'
import { AirtableCMSData } from 'AirtableCMS'

// This queries the Site metadata table in airtable,
// and is consumed by the CMS.SiteMetadataProvider component
// in Providers. This data is used to populate SEO tags
// for each page rendered.
const useSiteMetadataQuery = () => {
  const { siteMetadata }: { siteMetadata: AirtableCMSData } = useStaticQuery(
    graphql`
      query siteMetadataQuery {
        siteMetadata: allAirtable(filter: { table: { eq: "Site metadata" } }) {
          nodes {
            data {
              Name
              Text
              Image {
                localFiles {
                  childImageSharp {
                    gatsbyImageData(height: 630, placeholder: BLURRED)
                  }
                }
              }
            }
          }
        }
      }
    `
  )

  return siteMetadata
}

export default useSiteMetadataQuery
