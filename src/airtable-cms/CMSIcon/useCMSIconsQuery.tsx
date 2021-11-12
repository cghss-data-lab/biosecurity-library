import { useStaticQuery, graphql } from 'gatsby'

// This query and interface lives here because it assumes the
// CMS airtable base has this table already, because the table
// will be part of the template.
export interface IconsQuery {
  iconsQuery: {
    nodes: {
      data: {
        Name: string
        Text: string
        SVG: {
          localFiles: {
            childSvg: {
              svgString: string
            }
          }[]
        }
      }
    }[]
  }
}

const useCMSIconsQuery = () => {
  const {
    iconsQuery: { nodes },
  } = useStaticQuery<IconsQuery>(graphql`
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

  return nodes
}

export default useCMSIconsQuery
