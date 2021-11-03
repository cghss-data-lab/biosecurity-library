import React, { useState } from 'react'
import { useTheme } from 'styled-components'

import AirtableCMSPlotIcon from '../../../airtable-cms/AirtableCMSPlotIcon'

import { DimObj } from './BarChart'

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

  return (
    <>
      <rect
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        key={index}
        x={index * (dim.barWidth + dim.barGap)}
        y={(dim.maxBar - bar.totalCount) * dim.scale}
        width={dim.barWidth}
        height={dim.scale * bar.totalCount}
        fill={hover ? theme.colorGolden : theme.colorDarkest}
        stroke={theme.colorDarkest}
      />
      <AirtableCMSPlotIcon
        noEmitError
        style={{ pointerEvents: 'none' }}
        name={bar.fieldValue}
        color={hover ? theme.colorDarkest : theme.colorGolden}
        x={index * (dim.barWidth + dim.barGap) + 0.5 * dim.barWidth}
        y={
          (dim.maxBar - bar.totalCount) * dim.scale +
          0.5 * (dim.scale * bar.totalCount)
        }
        width={10}
        height={10}
      />
    </>
  )
}

export default Bar
