import React from 'react'
import styled from 'styled-components'
import CMSIcon from '@talus-analytics/library.airtable.cms-icon'

const IconHolder = styled.foreignObject`
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
`

export interface CMSPlotIconProps
  extends React.SVGAttributes<SVGForeignObjectElement> {
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

const CMSPlotIcon = ({
  x,
  y,
  height,
  width,
  name,
  color,
  hoverColor,
  noEmitError = false,
  ...props
}: CMSPlotIconProps): JSX.Element => (
  <IconHolder {...props} x={x - width / 2} y={y - height / 2}>
    <CMSIcon
      style={{ width, height }}
      {...{ name, color, hoverColor, noEmitError }}
    />
  </IconHolder>
)

export default CMSPlotIcon
