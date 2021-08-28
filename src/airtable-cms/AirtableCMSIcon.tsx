import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import styled from 'styled-components'
import { useEffect } from 'react'
import { useState } from 'react'

// replace the fill colors everywhere in the SVG
// this intentionally ignores `fill="none"` because
// figma likes to use that for the entire SVG.
const replaceFill = (svg: string, color: string) =>
  svg.replace(/fill="#[A-Z0-9]{6}"/g, `fill="${color}"`)

const HoverParent = styled.div`
  & > svg {
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
`

interface IconInterface {
  name: string
  color: string
  hoverColor?: string
  className?: string
  style?: React.CSSProperties
}

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
  const [iconColor, setIconColor] = useState(color)

  const altText = icons.find(({ data }) => data.Name === name)?.data.Text

  useEffect(() => {
    const getIcon = async (iconURL: string) => {
      const svg = await fetch(iconURL)
      const blob = await svg.blob()
      const text = await blob.text()
      setIcon(text)
    }

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

  if (hoverColor) {
    return (
      <HoverParent
        role="img"
        aria-label={altText}
        style={style}
        className={className}
        dangerouslySetInnerHTML={{ __html: replaceFill(icon, iconColor) }}
        onMouseEnter={() => setIconColor(hoverColor)}
        onMouseLeave={() => setIconColor(color)}
      />
    )
  }
  return (
    <HoverParent
      role="img"
      aria-label={altText}
      style={style}
      className={className}
      dangerouslySetInnerHTML={{ __html: replaceFill(icon, iconColor) }}
    />
  )
}

export default AirtableCMSIcon
