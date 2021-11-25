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
  margin-bottom: 10vw;
`
const ImageHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 1em;
`
const ButtonLink = styled.a`
  display: block;
  width: fit-content;
  text-decoration: none;
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    #edb458;
  padding: 0.5em 1em;
  border: 2px solid ${({ theme }) => theme.colorGolden};
  color: ${({ theme }) => theme.colorBlack} !important;
  margin-top: 1em;
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

        <h2>
          <CMS.Text name="H2" data={data} />
        </h2>
        <CMS.RichText name="Overview" data={data} />

        <h3>
          <CMS.Text name="Contact h3" data={data} />
        </h3>
        <CMS.RichText name="Contact text" data={data} />

        <h3>
          <CMS.Text name="Contributors h3" data={data} />
        </h3>
        <ImageHolder>
          <CMS.Image name="Georgetown logo" data={data} />
          <CMS.Image name="Talus logo" data={data} />
        </ImageHolder>
        <CMS.RichText name="Contributors text" data={data} />
        <h3>
          <CMS.Text name="Funder h3" data={data} />
        </h3>
        <ImageHolder>
          <CMS.Image name="Funder logo" data={data} />
        </ImageHolder>
        <h3>
          <CMS.Text name="Methods h3" data={data} />
        </h3>
        <CMS.RichText name="Methods text" data={data} />
        <ButtonLink>
          <CMS.Text name="Methods button" data={data} />
        </ButtonLink>
        <h3>
          <CMS.Text name="Other h3" data={data} />
        </h3>
        <CMS.RichText name="Other text" data={data} />
      </AboutMain>
    </FigmaProvider>
  )
}

export default About
