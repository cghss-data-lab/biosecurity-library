import React from 'react'
import FigmaProvider from '../figma/FigmaProvider'

import ImageHeader from '../components/layout/ImageHeader'
import NavBar from '../components/layout/NavBar/NavBar'
import Main from '../components/layout/Main'
import IntroSection from '../components/homepage/IntroSection'
import useHomePageData from '../airtableQueryHooks/useHomePageData'
import ResourceSearch from '../components/homepage/ResourceSearch'
import CarouselSection from '../components/homepage/CarouselSection/CarouselSection'
import BarChart from '../components/homepage/barChart/BarChart'

const IndexPage = (): JSX.Element => {
  const { homePageText } = useHomePageData()
  return (
    <FigmaProvider>
      <NavBar />
      <ImageHeader cmsData={homePageText} />
      {/*<Main>*/}
      <IntroSection />
      <ResourceSearch />
      <CarouselSection />
      <BarChart />
      {/*</Main>*/}
    </FigmaProvider>
  )
}

export default IndexPage
