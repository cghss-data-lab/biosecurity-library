import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

// replace the fill colors everywhere in the SVG
// this intentionally ignores `fill="none"` because
// figma likes to use that for the entire SVG.
const replaceFill = (svg: string, color: string) =>
  svg.replace(/fill="#[A-Z0-9]{6}"/g, `fill="${color}"`)

const SVGContainer = styled.div`
  // make the SVG responsive so it takes the size of the parent;
  // stop it from sending mouseout events to the parent
  & > svg {
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
`

// This query lives here because it assumes the CMS airtable
// base has this table already, because the table will be part
// of the template.
interface IconsQuery {
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

interface IconInterface {
  name: string
  color: string
  hoverColor?: string
  className?: string
  style?: React.CSSProperties
}

const AirtableCMSIcon: React.FC<IconInterface> = ({
  name,
  color,
  hoverColor,
  className,
  style,
}) => {
  const {
    iconsQuery: { nodes: icons },
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

  const icon = icons.find(({ data }) => data.Name === name)!

  // this iconColor can be in any format
  const [iconColor, setIconColor] = useState(color)

  // only add mouseEnter and mouseLeave events
  // if there is a hover color specified
  let mouseHandlers = {}
  if (hoverColor)
    mouseHandlers = {
      onMouseEnter: () => setIconColor(hoverColor),
      onMouseLeave: () => setIconColor(color),
    }

  const iconString = icon.data.SVG.localFiles[0].childSvg.svgString

  return (
    <SVGContainer
      role="img"
      aria-label={icon.data.Text}
      style={style}
      className={className}
      dangerouslySetInnerHTML={{ __html: replaceFill(iconString, iconColor) }}
      {...mouseHandlers}
    />
  )
}

export default AirtableCMSIcon
