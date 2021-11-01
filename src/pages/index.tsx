import React from 'react'

import FigmaProvider from '../figma/FigmaProvider'

import ImageHeader from '../components/layout/ImageHeader'
import NavBar from '../components/layout/NavBar/NavBar'
import Main from '../components/layout/Main'
import IntroSection from '../components/homepage/IntroSection'
import useHomePageData from '../airtableQueryHooks/useHomePageData'

const IndexPage = (): JSX.Element => {
  const { homePageText } = useHomePageData()
  return (
    <FigmaProvider>
      <NavBar />
      <ImageHeader cmsData={homePageText} />
      <Main>
        <IntroSection />
      </Main>
    </FigmaProvider>
  )
}

export default IndexPage
