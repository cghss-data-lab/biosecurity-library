import React from 'react'
import FigmaProvider from '../figma/FigmaProvider'

import ImageHeader from '../components/layout/ImageHeader'
import NavBar from '../components/layout/NavBar/NavBar'
import IntroSection from '../components/homepage/IntroSection'
import useHomePageData from '../airtableQueryHooks/useHomePageData'
import ResourceSearch from '../components/homepage/ResourceSearch'
import CarouselSection from '../components/homepage/CarouselSection/CarouselSection'
import BarChart from '../components/homepage/barChart/BarChart'
import Footer from 'components/layout/Footer'
// import useDarkPreference from 'hooks/useDarkPreference'
// import styled from 'styled-components'

// const Example = styled.div`
//   width: 100%;
//   height: 100vh;
//   transition: 250ms ease;
//   display: flex;
//   align-items: center;
// `

const IndexPage = (): JSX.Element => {
  // const userPrefersDark = useDarkPreference()

  const { homePageText } = useHomePageData()
  return (
    <FigmaProvider>
      <NavBar />
      <ImageHeader cmsData={homePageText} />
      <IntroSection />
      <ResourceSearch />
      <CarouselSection />
      <BarChart />
      {/* <Example
        style={{ backgroundColor: userPrefersDark ? '#2C232E' : '#F5F0F2' }}
      >
        <p style={{ color: userPrefersDark ? '#F5F0F2' : '#2C232E' }}>
          {userPrefersDark ? 'Darkmode!' : 'Lightmode!'}
        </p>
      </Example> */}
      <Footer />
    </FigmaProvider>
  )
}

export default IndexPage
