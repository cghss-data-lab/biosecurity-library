import React from 'react'

import FigmaProvider from '../figma/FigmaProvider'

import ImageHeader from '../components/homepage/ImageHeader'
import NavBar from '../components/layout/NavBar/NavBar'
import Main from '../components/layout/Main'
import IntroSection from '../components/homepage/IntroSection'
import Carousel from '../components/ui/Carousel/Carousel'

const IndexPage = (): JSX.Element => (
  <FigmaProvider>
    <NavBar />
    <ImageHeader />
    <Main>
      <IntroSection />
      <Carousel />
    </Main>
  </FigmaProvider>
)

export default IndexPage
