import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import { parse } from 'node-html-parser'

// replace the fill and stroke colors on all child
// elements of the SVG; but only if those elements
// already have a fill or stroke set.
const replaceFill = (svg: string, color: string) => {
  // this uses node-html-parser instead of native DOM
  // so that it will support server-side-rendering.
  const svgDom = parse(svg)
  const svgElement = svgDom.querySelector('svg')!
  const children: any[] = svgElement.childNodes

  for (let child of children) {
    if ('attributes' in child) {
      if (child.hasAttribute('fill')) child.setAttribute('fill', color)
      if (child.hasAttribute('stroke')) child.setAttribute('stroke', color)
    }
  }
  return svgDom.toString()
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

// This query and interface lives here because it assumes the
// CMS airtable base has this table already, because the table
// will be part of the template.
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

  const icon = icons.find(({ data }) => data.Name === name)

  if (!icon) {
    throw new Error(
      `Icon ${name} not found in ` +
        `Airtable. Does the airtable base include the ` +
        `Icons table, and does that table include ` +
        `an icon called ${name}?.`
    )
  }

  const [hover, setHover] = useState(false)

  const displayIcon = replaceFill(
    icon.data.SVG.localFiles[0].childSvg.svgString,
    hover && hoverColor ? hoverColor : color
  )

  // only add mouseEnter and mouseLeave events
  // if there is a hover color specified
  let mouseHandlers = {}
  if (hoverColor)
    mouseHandlers = {
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
    }

  return (
    <SVGContainer
      role="img"
      aria-label={icon.data.Text}
      style={style}
      className={className}
      dangerouslySetInnerHTML={{ __html: displayIcon }}
      {...mouseHandlers}
    />
  )
}

export default AirtableCMSIcon
