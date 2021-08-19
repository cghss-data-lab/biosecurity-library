import React from 'react'
import styled from 'styled-components'

import { HomePageText, ResourceSearchData } from '../../pages'
import ResourceSearch from './ResourceSearch'

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

const findByName = (homePageText: HomePageText, name: string) =>
  homePageText.nodes.find(n => n.data.Name === name)?.data.Text

const IntroSection: React.FC<{
  homePageText: HomePageText
  resourceSearchData: ResourceSearchData
}> = ({ resourceSearchData, homePageText }) => (
  <Section>
    <h1>{findByName(homePageText, 'First Header')}</h1>
    <h3>{findByName(homePageText, 'First Paragraph')}</h3>
    <ResourceSearch {...{ homePageText, resourceSearchData }} />
  </Section>
)

export default IntroSection
