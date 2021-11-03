import React, { SetStateAction, useEffect } from 'react'
import { CarouselState } from './Carousel'

const useCarouselTimers = (
  transition: number,
  state: CarouselState,
  setState: React.Dispatch<SetStateAction<CarouselState>>
): void => {
  useEffect(() => {
    if (state.nextIndex !== undefined) {
      setTimeout(
        () =>
          setState(prev => ({
            ...prev,
            activeIndex: prev.nextIndex ?? 0,
            nextIndex: undefined,
          })),
        transition
      )
    }
    if (state.prevIndex !== undefined) {
      setTimeout(
        () =>
          setState(prev => ({
            ...prev,
            activeIndex: prev.prevIndex ?? 0,
            prevIndex: undefined,
          })),
        transition
      )
    }
  }, [transition, state.prevIndex, state.nextIndex, setState])
}

export default useCarouselTimers
