import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CarouselDots from './CarouselDots'

const Section = styled.section`
  display: flex;
  flex-direction: column;
`
const Page = styled.div`
  position: relative;
  transition: 0ms;
  transform: translate(0);
`
const Next = styled.div`
  position: absolute;
  top: 0;
  left: calc(100% + 15px);
  width: 100%;
`
const Active = styled.div`
  position: relative;
  width: 100%;
`
const Prev = styled.div`
  position: absolute;
  top: 0;
  right: calc(100% + 15px);
  width: 100%;
`

interface CarouselProps {
  /**
   * The children will become the pages of the carousel
   */
  children: React.ReactNode
  /**
   * Animation duration
   */
  transition?: number
  /**
   * Color for the next and previous buttons
   */
  buttonColor?: string
  /**
   * color for the disabled next and previous buttons
   */
  disabledButtonColor?: string
  /**
   * Color for the active dots
   */
  dotColor?: string
  /**
   * Color for the inactive dots
   */
  inactiveDotColor?: string
  /**
   * Classname for styled components support
   */
  className?: string
}

export interface CarouselState {
  nextIndex?: number | undefined
  activeIndex: number
  prevIndex?: number | undefined
}

const Carousel = ({
  children,
  className,
  transition = 250,
  buttonColor = '#316DA4',
  disabledButtonColor = '#EAEBED',
  dotColor = buttonColor,
  inactiveDotColor = disabledButtonColor,
}: CarouselProps): JSX.Element => {
  const pages = React.Children.toArray(children)
  const [state, setState] = useState<CarouselState>({ activeIndex: 0 })

  useCarouselTimers(transition, state, setState)

  let translate = '0'
  if (state.prevIndex !== undefined) translate = 'calc(100% + 15px)'
  if (state.nextIndex !== undefined) translate = 'calc(-100% - 15px)'

  console.log(translate)

  return (
    <Section className={className}>
      <CarouselDots
        onClick={(_, index) => {
          if (index === state.activeIndex) return
          if (index < state.activeIndex)
            setState(prev => ({ ...prev, prevIndex: index }))
          else setState(prev => ({ ...prev, nextIndex: index }))
        }}
        {...{ pages, activeIndex: state.activeIndex }}
      />
      <Page
        style={{
          transform: `translate(${translate})`,
          transition: `${translate !== '0' ? transition + 'ms' : '0ms'}`,
        }}
      >
        <Prev
          key={state.prevIndex}
          style={{
            opacity: state.prevIndex !== undefined ? '1' : '0',
            transition: `${transition}ms`,
          }}
        >
          {state.prevIndex !== undefined && pages[state.prevIndex]}
        </Prev>
        <Active
          key={state.activeIndex}
          style={{
            opacity:
              state.prevIndex !== undefined || state.nextIndex !== undefined
                ? '0'
                : '1',
            transition: `${translate !== '0' ? transition + 'ms' : '0ms'}`,
          }}
        >
          {pages[state.activeIndex]}
        </Active>
        <Next
          key={state.nextIndex}
          style={{
            opacity: state.nextIndex !== undefined ? '1' : '0',
            transition: `${transition}ms`,
          }}
        >
          {state.nextIndex !== undefined && pages[state.nextIndex]}
        </Next>
      </Page>
    </Section>
  )
}

export default Carousel
