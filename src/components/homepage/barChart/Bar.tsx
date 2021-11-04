import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components'

import AirtableCMSPlotIcon from '../../../airtable-cms/AirtableCMSPlotIcon'

import { DimObj } from './BarChart'

const Label = styled.text`
  font-size: 5px;
  transform: rotate(-45deg);
  text-anchor: end;
`

interface BarProps {
  index: number
  dim: DimObj
  bar: {
    fieldValue: string
    totalCount: number
  }
}

const Bar = ({ index, bar, dim }: BarProps): JSX.Element => {
  const theme: any = useTheme()

  const [hover, setHover] = useState(false)

  const startX = index * (dim.barWidth + dim.barGap)
  const startY = (dim.maxBar - bar.totalCount) * dim.scale
  const height = dim.scale * bar.totalCount
  const endY = startY + height
  const midX = startX + 0.5 * dim.barWidth
  const midY = startY + 0.5 * height

  // const definitions = useDefinit

  return (
    <>
      <rect
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        key={index}
        x={startX}
        y={startY}
        width={dim.barWidth}
        height={height}
        fill={hover ? theme.colorGolden : theme.colorDarkest}
        stroke={theme.colorDarkest}
      />
      <AirtableCMSPlotIcon
        noEmitError
        style={{ pointerEvents: 'none' }}
        name={bar.fieldValue}
        color={hover ? theme.colorDarkest : theme.colorGolden}
        x={midX}
        y={midY}
        width={dim.iconSize}
        height={dim.iconSize}
      />
      <g
        style={{ transform: `translate(${midX}px, ${endY + dim.labelPad}px)` }}
      >
        <Label
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {bar.fieldValue}
        </Label>
      </g>
    </>
  )
}

export default Bar
