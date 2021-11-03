import React, { useState } from 'react'
import styled from 'styled-components'
import CarouselDots from './CarouselDots'
import useCarouselTimers from './useCarouselTimers'
import { PrevButton, NextButton } from './buttons'

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 35px;
`
const CarouselMain = styled.div`
  position: relative;
`
const Page = styled.div`
  position: relative;
  transition: 0ms;
  transform: translate(0);
`
// these styles are objects, instead of styled components,
// so that the divs they're applied to don't re-mount all
// the children each render cycle, which is inefficient
// and can cause a flicker when child components trigger
// effects.
const tempPageStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  width: '100%',
}
const nextStyle: React.CSSProperties = {
  ...tempPageStyle,
  left: 'calc(100% + 15px)',
}
const prevStyle: React.CSSProperties = {
  ...tempPageStyle,
  right: 'calc(100% + 15px)',
}
const activeStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
}

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

  return (
    <Section className={className}>
      <CarouselDots
        activeIndex={state.activeIndex}
        onClick={(_, index) => {
          if (index === state.activeIndex) return
          if (index < state.activeIndex)
            setState(prev => ({ ...prev, prevIndex: index }))
          else setState(prev => ({ ...prev, nextIndex: index }))
        }}
        {...{ pages, dotColor, inactiveDotColor }}
      />
      <CarouselMain>
        <Page
          style={{
            transform: `translate(${translate})`,
            transition: `${translate !== '0' ? transition + 'ms' : '0ms'}`,
          }}
        >
          <div
            key={state.prevIndex}
            style={{
              ...prevStyle,
              opacity: state.prevIndex !== undefined ? '1' : '0',
              transition: `${transition}ms`,
            }}
          >
            {state.prevIndex !== undefined && pages[state.prevIndex]}
          </div>
          <div
            key={state.activeIndex}
            style={{
              ...activeStyle,
              opacity:
                state.prevIndex !== undefined || state.nextIndex !== undefined
                  ? '0'
                  : '1',
              transition: `${translate !== '0' ? transition + 'ms' : '0ms'}`,
            }}
          >
            {pages[state.activeIndex]}
          </div>
          <div
            key={state.nextIndex}
            style={{
              ...nextStyle,
              opacity: state.nextIndex !== undefined ? '1' : '0',
              transition: `${transition}ms`,
            }}
          >
            {state.nextIndex !== undefined && pages[state.nextIndex]}
          </div>
        </Page>
        <PrevButton
          color={buttonColor}
          disabledColor={disabledButtonColor}
          disabled={state.activeIndex === 0}
          onClick={() =>
            setState(prev => ({ ...prev, prevIndex: prev.activeIndex - 1 }))
          }
        />
        <NextButton
          color={buttonColor}
          disabledColor={disabledButtonColor}
          disabled={state.activeIndex === pages.length - 1}
          onClick={() =>
            setState(prev => ({ ...prev, nextIndex: prev.activeIndex + 1 }))
          }
        />
      </CarouselMain>
    </Section>
  )
}

export default Carousel
