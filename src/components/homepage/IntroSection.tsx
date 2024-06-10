import React from 'react'
import styled from 'styled-components'

import CMS from 'AirtableCMS'
import useHomePageData from '../../airtableQueryHooks/useHomePageData'

const Section = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 920px;
  margin: 0 auto;
  padding: 0 10px;
`
const IntroParagraph = styled.div`
  p {
    font-style: normal;
    font-weight: normal;
    font-size: 20px !important;
    line-height: 30px !important;
    padding-bottom: 1em;

    @media (max-width: 500px) {
      font-size: 18px !important;
    }

    &:first-of-type {
      padding-top: 30px;
    }
    &:last-of-type {
      padding-bottom: 40px;
      @media (max-width: 500px) {
        padding-bottom: 20px;
      }
    }
  }
  a {
    font-size: inherit !important;
  }
`

const H1 = styled.h1`
  text-align: center;
  margin-bottom: 0px;
  /* font-family: 'Spectral' !important; */
  font-size: 50px !important;

  @media (max-width: 500px) {
    font-size: 35px !important;
  }
`

const IntroSection = (): JSX.Element => {
  const { homePageText } = useHomePageData()

  return (
    <Section>
      <H1>
        <CMS.Text name={'First Header'} data={homePageText} />
      </H1>
      <IntroParagraph>
        <CMS.RichText name={'First Paragraph'} data={homePageText} />
      </IntroParagraph>
    </Section>
  )
}

export default IntroSection
