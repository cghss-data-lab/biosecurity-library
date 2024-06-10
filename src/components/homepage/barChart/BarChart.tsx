import React from 'react'
import styled from 'styled-components'

import CMS from 'AirtableCMS'

import useHomePageData from '../../../airtableQueryHooks/useHomePageData'
import Main from '../../layout/Main'

import Bar from './Bar'

const Content = styled(Main)``
const Section = styled.section`
  padding: 35px 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-bottom: 65px; */
  background: ${({ theme }) => theme.colorDarkest};

  @media (max-width: 800px) {
    padding: 10px;
  }
`
const Instruction = styled.div`
  margin-top: 18px;

  > div > p {
    font-style: italic;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    color: ${({ theme }) => theme.colorBlack};
    font-family: 'Open Sans', Arial, Helvetica, sans-serif;
    color: white;
    text-align: center;
    padding-top: 8px;
  }
`
const Svg = styled.svg`
  margin-top: 30px;
  width: 100%;
  overflow: visible;
  padding-bottom: 12vw;
`
const ChartScroller = styled.div`
  max-width: 100%;
  overflow-x: scroll;
`
const ChartHolder = styled.div`
  min-width: 1100px;
  padding: 65px 65px 80px 65px;
`
const SwipeInstruction = styled.div`
  font-style: italic;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colorBlack};
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  color: white;
  text-align: center;
  padding-top: 8px;

  @media (min-width: 1200px) {
    display: none;
  }
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
    iconSize: 10,
    labelPad: 10,
  }

  const barCount = homePageResources.group.length

  dim.maxBar = Math.max(...homePageResources.group.map(bar => bar.totalCount))
  dim.barWidth = (dim.width - dim.barGap * barCount) / barCount
  dim.scale = dim.height / dim.maxBar

  const sortedBars = homePageResources.group.sort(
    (a, b) => b.totalCount - a.totalCount
  )

  return (
    <Section>
      <Content>
        <h2 style={{ color: 'white', textAlign: 'center' }}>
          <CMS.Text name="Third header" data={homePageText} />
        </h2>
        <Instruction>
          <CMS.RichText name="Third header subtext" data={homePageText} />
        </Instruction>
        <SwipeInstruction>
          Swipe sideways to view more categories.
        </SwipeInstruction>
        <ChartScroller>
          <ChartHolder>
            <Svg viewBox={`0 0 ${dim.width} ${dim.height}`}>
              {sortedBars.map((bar, index) => (
                <Bar key={index} {...{ index, bar, dim }} />
              ))}
            </Svg>
          </ChartHolder>
        </ChartScroller>
      </Content>
    </Section>
  )
}

export default BarChart
