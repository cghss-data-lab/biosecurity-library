import React from 'react'
import styled, { useTheme } from 'styled-components'
import { HomePageResources } from '../../../airtableQueryHooks/useHomePageData'

const Svg = styled.svg`
  margin-top: 30px;
  width: 100%;
  overflow: visible;
`

const BarChart: React.FC<{ homePageResources: HomePageResources }> = ({
  homePageResources,
}) => {
  const dim: any = {
    width: 500,
    height: 300,
    barGap: 10,
  }

  const barCount = homePageResources.group.length
  const maxBar = Math.max(...homePageResources.group.map(bar => bar.totalCount))
  const scale = dim.height / maxBar

  dim.barWidth = (dim.width - dim.barGap * barCount) / barCount

  const theme: any = useTheme()

  return (
    <Svg viewBox={`0 0 ${dim.width} ${dim.height}`}>
      {homePageResources.group.map((bar, index) => (
        <rect
          key={index}
          x={index * (dim.barWidth + dim.barGap)}
          y={(maxBar - bar.totalCount) * scale}
          width={dim.barWidth}
          height={scale * bar.totalCount}
          fill={theme.colorDarkest}
        />
      ))}
    </Svg>
  )
}

export default BarChart
