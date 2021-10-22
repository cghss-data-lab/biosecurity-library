import React from 'react'
import styled from 'styled-components'
import useCaroselData from '../../airtableQueryHooks/useCarouselResources'

import Carousel from '../ui/Carousel/Carousel'

const StyledCarousel = styled(Carousel)`
  margin-top: 30px;
`

const CarouselSection = (): JSX.Element => {
  const carouselResources = useCaroselData()

  console.log(carouselResources)

  return (
    <StyledCarousel>
      <p>page 1</p>
      <p>page 2</p>
      <p>page 3</p>
    </StyledCarousel>
  )
}

export default CarouselSection
