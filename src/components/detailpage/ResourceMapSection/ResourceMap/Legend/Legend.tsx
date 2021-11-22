/**
 * Resource map legend
 */
import React, { FC } from 'react'
import styled from 'styled-components'

/**
 * Legend container floats to left of resource map graphic.
 */
// TODO responsiveness: move beneath graphic on narrow screens.
const LegendContainer = styled.div`
  z-index: 1;
  margin-top: auto;
  /* position: absolute; */
  /* bottom: 0; */
  display: flex;
  flex-flow: column;
  justify-items: baseline;
  > div:not(:first-child) {
    margin-top: 1em;
  }
  /* padding: 0.5em; */
  // background-color: rgba(255, 255, 255, 0.9);

  > h6 {
    text-transform: uppercase;
    margin: 0;
  }
`

interface LegendProps extends React.HTMLAttributes<HTMLDivElement> {}

const Legend: FC<LegendProps> = ({ children }) => {
  return <LegendContainer>{children}</LegendContainer>
}

export default Legend
