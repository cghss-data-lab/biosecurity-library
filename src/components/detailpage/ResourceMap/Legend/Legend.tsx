import React, { FC } from 'react'
import styled from 'styled-components'

const LegendContainer = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 0;
  display: grid;
  grid-auto-flow: row;
  justify-items: baseline;
  max-width: 300px;
  width: max-content;
  > div:not(:first-child) {
    margin-top: 1em;
  }

  /* background-color: red; */
`

const LegendBackground = styled.div`
  background-color: blue;
`

interface LegendProps extends React.HTMLAttributes<HTMLDivElement> {}

const Legend: FC<LegendProps> = ({ children }) => {
  return (
    <LegendBackground>
      <LegendContainer>{children}</LegendContainer>
    </LegendBackground>
  )
}

export default Legend
