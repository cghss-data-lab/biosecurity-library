import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

// replace the fill colors everywhere in the SVG
// this intentionally ignores `fill="none"` because
// figma likes to use that for the entire SVG.
const replaceFill = (svg: string, color: string) =>
  svg.replace(/fill="#[A-Z0-9]{6}"/g, `fill="${color}"`)

const SVGContainer = styled.div`
  // make the SVG responsive so
  // it takes the size of the parent
  // and stop it from sending mouseout
  // events to the parent
  & > svg {
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
`

// This query lives here because
// it assumes the CMS airtable
// base has this table already,
// because it will be part
// of the template.
interface IconsQuery {
  iconsQuery: {
    nodes: {
      data: {
        Name: string
        Text: string
        SVG: {
          localFiles: {
            publicURL: string
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
                publicURL
              }
            }
          }
        }
      }
    }
  `)

  // keeping the original icon that came from airtable
  // because figma uses hex colors; this way iconColor
  // can be any color format without needing to change
  // the color replacement regex.
  const [icon, setIcon] = useState('')

  // this iconColor can be in any format now
  // that it doesn't have to match the regex.
  const [iconColor, setIconColor] = useState(color)

  // pull alt-text from airtable, add it as an aria-label
  const altText = icons.find(({ data }) => data.Name === name)?.data.Text

  useEffect(() => {
    // request the icon file and parse it as a string
    const getIcon = async (iconURL: string) => {
      const file = await fetch(iconURL)
      const svgString = await file.blob().then(blob => blob.text())
      setIcon(svgString)
    }

    // check if the icon exists in the table; get the url
    const iconURL = icons.find(({ data }) => data.Name === name)?.data.SVG
      .localFiles[0].publicURL

    if (iconURL) getIcon(iconURL)
    else
      throw new Error(
        `Icon ${name} not found in ` +
          `Airtable. Does the airtable base include the ` +
          `Icons table, and does that table include ` +
          `an icon called ${name}?.`
      )
  }, [icons, name, color])

  // only add mouseEnter and mouseLeave events
  // if there is a hover color specified
  let mouseHandlers = {}
  if (hoverColor)
    mouseHandlers = {
      onMouseEnter: () => setIconColor(hoverColor),
      onMouseLeave: () => setIconColor(color),
    }

  return (
    <SVGContainer
      role="img"
      aria-label={altText}
      style={style}
      className={className}
      dangerouslySetInnerHTML={{ __html: replaceFill(icon, iconColor) }}
      {...mouseHandlers}
    />
  )
}

export default AirtableCMSIcon
