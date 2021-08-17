import React from 'react'
import styled from 'styled-components'

import { HomePageText } from '../../pages'

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

const IntroSection = ({ homePageText }: { homePageText: HomePageText }) => (
  <Section>
    <h1>
      {homePageText.nodes.find(n => n.data.Name === 'First Header').data.Text}
    </h1>
    <h3>
      {
        homePageText.nodes.find(n => n.data.Name === 'First Paragraph').data
          .Text
      }
    </h3>
  </Section>
)

export default IntroSection
