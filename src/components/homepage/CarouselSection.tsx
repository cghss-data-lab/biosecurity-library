import React from 'react'
import useCaroselData from '../../airtableQueryHooks/useCarouselResources'

import Carousel from '../ui/Carousel/Carousel'

const CarouselSection = (): JSX.Element => {
  const carouselResources = useCaroselData()

  console.log(carouselResources)

  return (
    <Carousel>
      <p>hello</p>
    </Carousel>
  )
}

export default CarouselSection
