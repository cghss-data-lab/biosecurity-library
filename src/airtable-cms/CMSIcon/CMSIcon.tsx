import React, { useState } from 'react'
import styled from 'styled-components'

import useAirtableIcon from './useCMSIcon'

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

interface CMSIconProps {
  /** Name of the icon in the icons tab */
  name: string
  /** color of the icon; note icons only accept one color */
  color: string
  /** className which will be applied to the svg container */
  className?: string
  /** color to change the icon to when hovered */
  hoverColor?: string
  /** CSS styles to apply to the svg container */
  style?: React.CSSProperties
  /**
   * Suppress missing icon error message;
   * component will return a fragment instead
   */
  noEmitError?: boolean
}

const CMSIcon = ({
  name,
  color,
  style,
  className,
  hoverColor,
  noEmitError = false,
}: CMSIconProps): JSX.Element => {
  const [hover, setHover] = useState(false)

  const icon = useAirtableIcon(
    name,
    hover && hoverColor ? hoverColor : color,
    noEmitError
  )

  if (!icon) return <></>

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
      aria-label={icon.text}
      style={style}
      className={className}
      dangerouslySetInnerHTML={{ __html: icon.svg }}
      {...mouseHandlers}
    />
  )
}

export default CMSIcon
