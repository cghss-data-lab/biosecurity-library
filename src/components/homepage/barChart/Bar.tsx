import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components'

import useDefinitions from '../../../airtableQueryHooks/useDefinitions'
import { DimObj } from './BarChart'

import CMS from '../../../AirtableCMS'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

const Label = styled.text`
  font-size: 5px;
  transform: rotate(-45deg);
  text-anchor: end;
  fill: white;
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

  const definitions = useDefinitions()
  const definition = definitions.find(
    def => def.data.Name.trim() === bar.fieldValue.trim()
  )?.data.Definition

  const iconPadding = 2
  let iconStyle: React.CSSProperties = { pointerEvents: 'none' }
  let iconStartY = midY
  let iconColor: string = theme.colorDarkest
  // GIFLENS-https://media1.giphy.com/media/5eFHIIUy0SCQgutzID/200.gif
  let mouseHandlers = {}

  // if the bar is too short, pop the icon above
  // and detect hover events on it
  if (height < dim.iconSize + iconPadding) {
    iconStyle = {}
    iconStartY = startY - dim.iconSize / 2 - iconPadding
    iconColor = theme.colorWhite
    mouseHandlers = {
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
    }
  }

  return (
    <>
      <Tippy content={definition} visible={hover}>
        <rect
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          key={index}
          x={startX}
          y={startY}
          width={dim.barWidth}
          height={height}
          fill={hover ? theme.colorGolden : theme.colorWhite}
          stroke={'#173057'}
        />
      </Tippy>
      <CMS.PlotIcon
        style={iconStyle}
        name={bar.fieldValue}
        color={iconColor}
        x={midX}
        y={iconStartY}
        width={dim.iconSize}
        height={dim.iconSize}
        {...mouseHandlers}
      />
      <g
        style={{
          transform: `translate(${midX}px, ${endY + dim.labelPad}px)`,
        }}
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
