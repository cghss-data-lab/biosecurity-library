import { useStaticQuery, graphql } from 'gatsby'
import { parse } from 'node-html-parser'
import { useMemo } from 'react'

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

export interface Icon {
  svg: string
  text: string
}

const useAllAirtableIcons = () => {
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

  const icons = useMemo(() => {
    console.log('ICON PARSING')
    return nodes.map(node => ({
      name: node.data.Name,
      svg: parse(node.data.SVG.localFiles[0].childSvg.svgString),
      text: node.data.Text,
    }))
  }, [nodes])

  return icons
}

export default useAllAirtableIcons
