import React, { useState } from 'react'
import styled, { createGlobalStyle, useTheme } from 'styled-components'

import { DimObj } from './BarChart'

import CMS from '@talus-analytics/library.airtable-cms'

import Tippy from '@tippyjs/react'
import 'tippy.js/themes/light.css'
import BarPopup from './BarPopup'
import { navigate } from 'gatsby'
import qs from 'qs'

const navigateToTopicArea = (keyTopicArea: string) =>
  navigate(
    `explore?${qs.stringify({
      filters: { Key_topic_area: [keyTopicArea] },
    })}`
  )

const Label = styled.text`
  font-size: 5px;
  transform: rotate(-45deg);
  text-anchor: end;
  fill: white;
`
const DisableTippyPadding = createGlobalStyle`
  .tippy-content {
    padding: 0;
  }
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

  const iconPadding = 1
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
      onClick: () => navigateToTopicArea(bar.fieldValue),
    }
  }

  return (
    <>
      <DisableTippyPadding />
      <rect
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => navigateToTopicArea(bar.fieldValue)}
        key={index}
        x={startX}
        y={startY}
        width={dim.barWidth}
        height={height}
        fill={hover ? theme.colorGolden : theme.colorWhite}
        stroke={'#173057'}
      />
      <Tippy
        content={<BarPopup barName={bar.fieldValue} />}
        visible={hover}
        maxWidth="600px"
        theme="light"
      >
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
      </Tippy>
      <g
        style={{
          transform: `translate(${midX}px, ${endY + dim.labelPad}px)`,
        }}
      >
        <Label
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => navigateToTopicArea(bar.fieldValue)}
        >
          {bar.fieldValue}
        </Label>
      </g>
    </>
  )
}

export default Bar
