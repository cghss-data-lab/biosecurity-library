import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import { HTMLElement, parse } from 'node-html-parser'

// TODO
export const getIconSvg = () => {
  throw new Error('Not implemented')
}

// replace the fill and stroke colors on all child
// elements of the SVG; but only if those elements
// already have a fill or stroke set.
export const replaceFill = (dom: HTMLElement, color: string) => {
  // this uses node-html-parser instead of native DOM
  // so that it will support server-side-rendering.
  // const svgElement = svgDom.querySelector('svg')!
  const children = dom.childNodes

  for (let child of children) {
    // note this is the node-html-parser implementation
    // of the HTMLElement class, not a native HTMLElement
    if (child instanceof HTMLElement) {
      // recursive call handles nested SVG structures like groups
      if (child.childNodes) replaceFill(child, color)
      if (child.hasAttribute('fill')) child.setAttribute('fill', color)
      if (child.hasAttribute('stroke')) child.setAttribute('stroke', color)
    }
  }
  return dom
}

const SVGContainer = styled.div`
  // make the SVG responsive so it takes the size of the parent;
  // stop it from sending mouseout events to the parent
  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
`

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
export interface IconsQueryMap {
  iconsQueryMap: {
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

export interface IconInterface {
  name: string
  color: string
  className?: string
  hoverColor?: string
  style?: React.CSSProperties
  noEmitError?: boolean
}

const AirtableCMSIcon: React.FC<IconInterface> = ({
  name,
  color,
  className,
  hoverColor,
  style,
  noEmitError = false,
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
  const [hover, setHover] = useState(false)

  if (!icon) {
    if (noEmitError) return <></>

    throw new Error(
      `Icon ${name} not found in ` +
        `Airtable. Does the airtable base include the ` +
        `Icons table, and does that table include ` +
        `an icon called ${name}?.`
    )
  }

  const svgDom = parse(icon.data.SVG.localFiles[0].childSvg.svgString)
  const displayIcon = replaceFill(
    svgDom,
    hover && hoverColor ? hoverColor : color
  ).toString()

  // only add mouseEnter and mouseLeave events
  // if there is a hover color specified
  let mouseHandlers = {}
  if (hoverColor)
    mouseHandlers = {
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
    }

  if (name === 'Dual Use') console.log(displayIcon)

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
