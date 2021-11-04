import React from 'react'
import styled from 'styled-components'
import AirtableCMSIcon from './AirtableCMSIcon'

const IconHolder = styled.foreignObject`
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface SVGIconProps extends React.SVGAttributes<SVGForeignObjectElement> {
  /** X position of the center of the icon */
  x: number
  /** Y position of the center of the icon */
  y: number
  /** Icon container height */
  height: number
  /** Icon container width */
  width: number
  /** Airtable Icon Name (will get passed to AirtableCMSIcon) */
  name: string
  /** Icon Color */
  color: string
  /** Icon hover color */
  hoverColor?: string
  /** Suppress AirtableCMSIcon missing icon error */
  noEmitError?: boolean
}

const AirtableCMSPlotIcon = ({
  x,
  y,
  height,
  width,
  name,
  color,
  hoverColor,
  noEmitError,
  ...props
}: SVGIconProps): JSX.Element => (
  <IconHolder {...props} x={x - width / 2} y={y - height / 2}>
    <AirtableCMSIcon
      style={{ width, height }}
      {...{ name, color, hoverColor, noEmitError }}
    />
  </IconHolder>
)

export default AirtableCMSPlotIcon
