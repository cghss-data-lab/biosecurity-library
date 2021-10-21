import React from 'react'
// import styled from 'styled-components'

import useCarouselData from '../../../airtableQueryHooks/useCarouselResources'

const Carousel = (): JSX.Element => {
  const carouselResources = useCarouselData()

  console.log(carouselResources)
  return <></>
}

export default Carousel
