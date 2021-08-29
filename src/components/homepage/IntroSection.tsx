import React from 'react'
import styled from 'styled-components'
import AirtableCMSIcon from '../../airtable-cms/AirtableCMSIcon'
import AirtableCMSText from '../../airtable-cms/AirtableCMSText'

import { AirtableCMSData } from '../../airtable-cms/types'

import { ResourceSearchData } from '../../pages'
import ResourceSearch from './ResourceSearch'

import { useTheme } from 'styled-components'

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
}> = ({ resourceSearchData, homePageText }) => {
  const theme: any = useTheme()
  return (
    <Section>
      <h1>
        <AirtableCMSText name={'First Header'} data={homePageText} />
      </h1>
      <h3>
        <AirtableCMSText name={'First Paragraph'} data={homePageText} />
      </h3>
      <AirtableCMSIcon
        name="Risk assessment"
        color="rgb(255, 150, 0)"
        hoverColor="#00FF00"
        style={{ height: '3.125rem', width: 50 }}
      />
      <AirtableCMSIcon
        name="Risk assessment"
        color={theme.colorDarker}
        hoverColor={theme.colorLighter}
      />
      <AirtableCMSIcon name="Lab research" color={theme.colorDarker} />

      <ResourceSearch {...{ homePageText, resourceSearchData }} />
    </Section>
  )
}

export default IntroSection
