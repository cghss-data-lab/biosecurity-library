import React from 'react'
import styled from 'styled-components'

import CMS from '@talus-analytics/library.airtable-cms'
import useHomePageData from '../../airtableQueryHooks/useHomePageData'

const Section = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 900px;
  margin: 0 auto;

  h1 {
    text-align: center;
    margin-bottom: 0px;
    font-family: 'Spectral' !important;
  }
`
const IntroParagraph = styled.div`
  p {
    font-style: normal;
    font-weight: normal;
    font-size: 20px !important;
    line-height: 30px !important;
    padding-bottom: 1em;
    &:first-of-type {
      padding-top: 30px;
    }
    &:last-of-type {
      padding-bottom: 40px;
    }
  }
`

const IntroSection = (): JSX.Element => {
  const { homePageText } = useHomePageData()

  return (
    <Section>
      <h1>
        <CMS.Text name={'First Header'} data={homePageText} />
      </h1>
      <IntroParagraph>
        <CMS.RichText name={'First Paragraph'} data={homePageText} />
      </IntroParagraph>
    </Section>
  )
}

export default IntroSection
