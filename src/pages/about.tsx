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
  max-width: 1000px;
  padding: 0 50px;
  @media (max-width: 700px) {
    padding: 0px 10px;
  }
  margin: 0 auto;
  margin-bottom: 3em;
  color: ${({ theme }) => theme.colorBlack};

  p {
    margin-top: 1em;
    margin-bottom: 1em;
  }
`
const ImageBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  margin-top: 30px;
  @media (max-width: 500px) {
    flex-wrap: wrap;
    padding: 0px 30px;
    justify-content: center;
  }
`
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
    ${({ theme }) => theme.colorGolden};
  padding: 0.5em 1em;
  border: 1px solid ${({ theme }) => theme.colorGolden};
  color: ${({ theme }) => theme.colorBlack} !important;
  margin-top: 1em;
  transition: 250ms;
  border-radius: 2px;

  &:hover {
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.3) 0%,
        rgba(255, 255, 255, 0) 100%
      ),
      ${({ theme }) => theme.colorYellow};
    border: 1px solid ${({ theme }) => theme.colorYellow};
    text-decoration: none !important;
  }
`

const About = (): JSX.Element => {
  const data = useAboutPageData()

  const imgScale = 0.75

  return (
    <FigmaProvider>
      <NavBar />
      <CMS.SEO title={'About'} />
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

        <ButtonLink name="Methods button" data={data} />

        <ImageBar>
          <ImageContainer
            style={{ height: 90 * imgScale, width: 513 * imgScale }}
          >
            <CMS.Image
              imgStyle={{ objectFit: 'contain' }}
              name="Funder logo"
              data={data}
            />
          </ImageContainer>
          <ImageContainer
            style={{ height: 90 * imgScale, width: 523 * imgScale }}
          >
            <CMS.Image
              imgStyle={{ objectFit: 'contain' }}
              name="Georgetown logo"
              data={data}
            />
          </ImageContainer>
          <ImageContainer
            style={{ height: 90 * imgScale, width: 168 * imgScale }}
          >
            <CMS.Image
              imgStyle={{ objectFit: 'contain' }}
              name="Talus logo"
              data={data}
            />
          </ImageContainer>
        </ImageBar>

        <h2
          style={{
            marginBottom: 15,
            borderTop: '1px solid #D3D3D3',
            paddingTop: 30,
          }}
        >
          <CMS.Text name="Other h2" data={data} />
        </h2>
        <CMS.RichText name="Other text" data={data} />
      </AboutMain>
      <Footer />
    </FigmaProvider>
  )
}

export default About
