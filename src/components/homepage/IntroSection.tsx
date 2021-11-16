import React from 'react'
import styled from 'styled-components'

import CMSText from '../../airtable-cms/CMSText/CMSText'
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
  }

  h3 {
    margin-top: 30px;
    font-weight: normal;
    font-style: normal;
    line-height: 38px;
  }
`

const IntroSection = (): JSX.Element => {
  const { homePageText } = useHomePageData()

  return (
    <Section>
      <h1>
        <CMSText name={'First Header'} data={homePageText} />
      </h1>
      <h3>
        <CMSText name={'First Paragraph'} data={homePageText} />
      </h3>
    </Section>
  )
}

export default IntroSection
