import { useStaticQuery, graphql } from 'gatsby'
import { IconsQuery } from '@talus-analytics/library.airtable.cms-icon'

// This query and interface lives here because it assumes the
// CMS airtable base has this table already, because the table
// will be part of the template.

const useCMSIconsQuery = () => {
  const iconsQuery = useStaticQuery<IconsQuery>(graphql`
    query iconsQuery {
      iconsQuery: allAirtable(filter: { table: { eq: "Icons" } }) {
        nodes {
          data {
            Name
            Text
            SVG {
              localFiles {
                childSvg {
                  svgString
                }
              }
            }
          }
        }
      }
    }
  `)

  return iconsQuery
}

export default useCMSIconsQuery
