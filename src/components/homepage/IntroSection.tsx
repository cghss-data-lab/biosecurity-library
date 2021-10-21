import React from 'react'
import styled from 'styled-components'
// import AirtableCMSIcon from '../../airtable-cms/AirtableCMSIcon'
import AirtableCMSText from '../../airtable-cms/AirtableCMSText'

import { AirtableCMSData } from '../../airtable-cms/types'

import {
  HomePageResources,
  ResourceSearchData,
} from '../../airtableQueryHooks/useHomePageData'

import BarChart from './barChart/BarChart'
import ResourceSearch from './ResourceSearch'

// import { useTheme } from 'styled-components'

const Section = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 900px;
  margin: 0 auto;

  h1 {
    text-align: center;
    margin-bottom: 0px;
  }

  h3 {
    margin-top: 30px;
    font-weight: normal;
    font-style: normal;
    line-height: 38px;
  }
`

const IntroSection: React.FC<{
  homePageText: AirtableCMSData
  resourceSearchData: ResourceSearchData
  homePageResources: HomePageResources
}> = ({ resourceSearchData, homePageText, homePageResources }) => {
  // const theme: any = useTheme()
  return (
    <Section>
      <h1>
        <AirtableCMSText name={'First Header'} data={homePageText} />
      </h1>
      <h3>
        <AirtableCMSText name={'First Paragraph'} data={homePageText} />
      </h3>
      <ResourceSearch {...{ homePageText, resourceSearchData }} />
      <BarChart {...{ homePageResources }} />
    </Section>
  )
}

export default IntroSection
