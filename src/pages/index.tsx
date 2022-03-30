import React from 'react'
import FigmaProvider from 'figma/FigmaProvider'
import CMS from 'AirtableCMS'

import ImageHeader from 'components/layout/ImageHeader'
import NavBar from 'components/layout/NavBar/NavBar'
import IntroSection from 'components/homepage/IntroSection'
import useHomePageData from 'airtableQueryHooks/useHomePageData'
import ResourceSearch from 'components/homepage/ResourceSearch'
import CarouselSection from 'components/homepage/CarouselSection/CarouselSection'
import BarChart from 'components/homepage/barChart/BarChart'
import Footer from 'components/layout/Footer'

const IndexPage = (): JSX.Element => {
  const { homePageText } = useHomePageData()
  return (
    <FigmaProvider>
      <CMS.SEO />
      <NavBar />
      <ImageHeader cmsData={homePageText} />
      <IntroSection />
      <ResourceSearch />
      <CarouselSection />
      <BarChart />
      <Footer />
    </FigmaProvider>
  )
}

export default IndexPage
