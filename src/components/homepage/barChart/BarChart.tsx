import React from 'react'
import styled, { useTheme } from 'styled-components'
import AirtableCMSText from '../../../airtable-cms/AirtableCMSText'
import useHomePageData from '../../../airtableQueryHooks/useHomePageData'
import AirtableCMSPlotIcon from '../../../airtable-cms/AirtableCMSPlotIcon'

const Section = styled.section`
  padding: 0 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10vw;
`
const Instruction = styled.div`
  font-style: italic;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colorBlack};
  font-family: 'Open Sans' Arial, Helvetica, sans-serif;
  margin-top: 18px;
`
const Svg = styled.svg`
  margin-top: 30px;
  width: 100%;
  overflow: visible;
`

interface DimObj {
  width: number
  height: number
  [key: string]: number
}

const BarChart = (): JSX.Element => {
  const { homePageResources, homePageText } = useHomePageData()

  const dim: DimObj = {
    width: 500,
    height: 150,
    barGap: 10,
  }

  const barCount = homePageResources.group.length
  const maxBar = Math.max(...homePageResources.group.map(bar => bar.totalCount))
  const scale = dim.height / maxBar

  dim.barWidth = (dim.width - dim.barGap * barCount) / barCount

  const theme: any = useTheme()

  const sortedBars = homePageResources.group.sort(
    (a, b) => b.totalCount - a.totalCount
  )

  return (
    <Section>
      <h2>
        <AirtableCMSText name="Third header" data={homePageText} />
      </h2>
      <Instruction>
        <AirtableCMSText name="Third header subtext" data={homePageText} />
      </Instruction>
      <Svg viewBox={`0 0 ${dim.width} ${dim.height}`}>
        {sortedBars.map((bar, index) => (
          <>
            <rect
              key={index}
              x={index * (dim.barWidth + dim.barGap)}
              y={(maxBar - bar.totalCount) * scale}
              width={dim.barWidth}
              height={scale * bar.totalCount}
              fill={theme.colorDarkest}
            />
            <AirtableCMSPlotIcon
              noEmitError
              name={bar.fieldValue}
              color={theme.colorGolden}
              x={index * (dim.barWidth + dim.barGap) + 0.5 * dim.barWidth}
              y={
                (maxBar - bar.totalCount) * scale +
                0.5 * (scale * bar.totalCount)
              }
              width={10}
              height={10}
            />
          </>
        ))}
      </Svg>
    </Section>
  )
}

export default BarChart
