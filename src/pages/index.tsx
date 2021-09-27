import React from 'react'
import { PageProps } from 'gatsby'

import FigmaProvider from '../figma/FigmaProvider'

import ImageHeader from '../components/homepage/ImageHeader'
import NavBar from '../components/layout/NavBar/NavBar'
import Main from '../components/layout/Main'
import IntroSection from '../components/homepage/IntroSection'
import useHomePageData from '../airtableQueryHooks/useHomePageData'

const IndexPage: React.FC<PageProps> = () => {
  const { homePageText, resourceSearchData, homePageResources } =
    useHomePageData()

  return (
    <FigmaProvider>
      <NavBar />
      <ImageHeader {...{ homePageText }} />
      <Main>
        <IntroSection
          {...{ homePageText, resourceSearchData, homePageResources }}
        />
      </Main>
    </FigmaProvider>
  )
}

export default IndexPage
