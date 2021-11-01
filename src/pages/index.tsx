import React from 'react'

import FigmaProvider from '../figma/FigmaProvider'

import ImageHeader from '../components/layout/ImageHeader'
import NavBar from '../components/layout/NavBar/NavBar'
import Main from '../components/layout/Main'
import IntroSection from '../components/homepage/IntroSection'
import useHomePageData from '../airtableQueryHooks/useHomePageData'
import styled from 'styled-components'
import ResourceSearch from '../components/homepage/ResourceSearch'
import CarouselSection from '../components/homepage/CarouselSection/CarouselSection'
import BarChart from '../components/homepage/barChart/BarChart'

const HomepageMain = styled(Main)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 900px;
  margin: 0 auto;
`

const IndexPage = (): JSX.Element => {
  const { homePageText } = useHomePageData()
  return (
    <FigmaProvider>
      <NavBar />
      <ImageHeader cmsData={homePageText} />
      <HomepageMain>
        <IntroSection />
        <ResourceSearch />
        <CarouselSection />
        <BarChart />
      </HomepageMain>
    </FigmaProvider>
  )
}

export default IndexPage
