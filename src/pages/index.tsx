import React from 'react'
import { PageProps } from 'gatsby'

import FigmaProvider from '../figma/FigmaProvider'

import ImageHeader from '../components/homepage/ImageHeader'
import NavBar from '../components/layout/NavBar/NavBar'
import Main from '../components/layout/Main'
import IntroSection from '../components/homepage/IntroSection'

const IndexPage: React.FC<PageProps> = () => (
  <FigmaProvider>
    <NavBar />
    <ImageHeader />
    <Main>
      <IntroSection />
    </Main>
  </FigmaProvider>
)

export default IndexPage
