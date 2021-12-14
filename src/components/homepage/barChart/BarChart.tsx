import React from 'react'
import styled from 'styled-components'

import CMS from '@talus-analytics/library.airtable-cms'

import useHomePageData from '../../../airtableQueryHooks/useHomePageData'
import Main from '../../layout/Main'

import Bar from './Bar'

const Content = styled(Main)`
  padding: 0 65px;
`
const Section = styled.section`
  padding: 35px 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 65px;
  background: ${({ theme }) => theme.colorDarkest};
`
const Instruction = styled.div`
  font-style: italic;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colorBlack};
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  margin-top: 18px;
  color: white;
  text-align: center;
`
const Svg = styled.svg`
  margin-top: 30px;
  width: 100%;
  overflow: visible;
  padding-bottom: 12vw;
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
          <CMS.Text name="Third header subtext" data={homePageText} />
        </Instruction>
        <Svg viewBox={`0 0 ${dim.width} ${dim.height}`}>
          {sortedBars.map((bar, index) => (
            <Bar key={index} {...{ index, bar, dim }} />
          ))}
        </Svg>
      </Content>
    </Section>
  )
}

export default BarChart
