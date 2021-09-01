import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

// replace the fill and stroke colors on all child
// elements of the SVG; but only if those elements
// already have a fill or stroke set.
const replaceFill = (svg: string, color: string) => {
  const parser = new DOMParser()
  const svgDom = parser.parseFromString(svg, 'image/svg+xml')
  const svgElement = svgDom.querySelector('svg')!
  const children: Element[] = Array.from(svgElement.children)

  for (let child of children) {
    if (child.hasAttribute('fill')) child.setAttribute('fill', color)
    if (child.hasAttribute('stroke')) child.setAttribute('stroke', color)
  }

  return svgDom.documentElement.outerHTML
}

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
