import React, { useState } from 'react'
import styled from 'styled-components'
import CarouselDots from './CarouselDots'

const Section = styled.section`
  display: flex;
  flex-direction: column;
`

interface CarouselProps {
  children: React.ReactNode
  className?: string
}

const Carousel = ({ children, className }: CarouselProps): JSX.Element => {
  const pages = React.Children.toArray(children) as React.ReactElement[]

  console.log(pages)

  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <Section className={className}>
      <CarouselDots
        onClick={(_, index) => setActiveIndex(index)}
        {...{ pages, activeIndex }}
      />
      {pages[activeIndex]}
    </Section>
  )
}

export default Carousel
