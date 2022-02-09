import CMS from '@talus-analytics/library.airtable-cms'
import Footer from 'components/layout/Footer'
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
  margin-bottom: 3em;
  color: ${({ theme }) => theme.colorBlack};

  p {
    margin-top: 1em;
    margin-bottom: 1em;
  }
`
const ImageHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 50px;
`
const ButtonLink = styled(CMS.Download)`
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

const About = (): JSX.Element => {
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

        <h2 style={{ marginBottom: 20 }}>
          <CMS.Text name="Overview h2" data={data} />
        </h2>
        <CMS.RichText name="Overview" data={data} />

        <ImageHolder>
          <CMS.Image
            imgStyle={{ objectFit: 'contain' }}
            name="Funder logo"
            data={data}
          />
          <CMS.Image
            imgStyle={{ objectFit: 'contain' }}
            name="Georgetown logo"
            data={data}
          />
          <CMS.Image
            imgStyle={{ objectFit: 'contain' }}
            name="Talus logo"
            data={data}
          />
        </ImageHolder>

        <h3 style={{ marginBottom: 15 }}>
          <CMS.Text name="Methods h3" data={data} />
        </h3>
        <CMS.RichText name="Methods text" data={data} />
        <ButtonLink name="Methods button" data={data} />

        <h2 style={{ marginBottom: 15 }}>
          <CMS.Text name="Other h2" data={data} />
        </h2>
        <CMS.RichText name="Other text" data={data} />
      </AboutMain>
      <Footer />
    </FigmaProvider>
  )
}

export default About
