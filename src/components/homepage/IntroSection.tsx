import React from 'react'
import styled from 'styled-components'

import { HomePageText } from '../../pages'
import Button from '../ui/Button'

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
const SearchControls = styled.div``

const findByName = (homePageText: HomePageText, name: string) =>
  homePageText.nodes.find(n => n.data.Name === name).data.Text

const IntroSection = ({ homePageText }: { homePageText: HomePageText }) => (
  <Section>
    <h1>{findByName(homePageText, 'First Header')}</h1>
    <h3>{findByName(homePageText, 'First Paragraph')}</h3>
    <SearchControls>
      <Button>{findByName(homePageText, 'Button Text')}</Button>
    </SearchControls>
  </Section>
)

export default IntroSection
