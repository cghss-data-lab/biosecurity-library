import { useStaticQuery, graphql } from 'gatsby'
import { IconsQuery } from '@talus-analytics/library.airtable.cms-icon'

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
