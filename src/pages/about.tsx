import CMS from '@talus-analytics/library.airtable-cms'
import React from 'react'
import styled from 'styled-components'
import useAboutPageData from '../airtableQueryHooks/useAboutPageData'

import NavBar from '../components/layout/NavBar/NavBar'
import AccessibilityBanner from '../components/ui/AccessibilityBanner/AccessibilityBanner'
import FigmaProvider from '../figma/FigmaProvider'

const Header = styled.header`
  text-align: center;
`

const AboutMain = styled.section`
  max-width: 900px;
  margin: 0 auto;
`

const About = () => {
  const data = useAboutPageData()

  return (
    <FigmaProvider>
      <NavBar />
      <AboutMain>
        <Header>
          <h1>
            <CMS.Text name="H1" data={data} />
          </h1>
        </Header>
        <AccessibilityBanner>
          <CMS.RichText name="Accessibility notice" data={data} />
        </AccessibilityBanner>
      </AboutMain>
    </FigmaProvider>
  )
}

export default About
