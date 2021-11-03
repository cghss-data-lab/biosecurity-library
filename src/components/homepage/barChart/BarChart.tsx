import React from 'react'
import styled from 'styled-components'

import AirtableCMSText from '../../../airtable-cms/AirtableCMSText'
import useHomePageData from '../../../airtableQueryHooks/useHomePageData'

import Bar from './Bar'

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

export interface DimObj {
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

  dim.maxBar = Math.max(...homePageResources.group.map(bar => bar.totalCount))
  dim.barWidth = (dim.width - dim.barGap * barCount) / barCount

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
          <Bar {...{ index, bar, dim }} />
        ))}
      </Svg>
    </Section>
  )
}

export default BarChart
