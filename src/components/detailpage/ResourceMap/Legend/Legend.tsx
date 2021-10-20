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
  > div:not(:first-child) {
    margin-top: 1em;
  }
`

interface LegendProps extends React.HTMLAttributes<HTMLDivElement> {}

const Legend: FC<LegendProps> = ({ children }) => {
  return <LegendContainer>{children}</LegendContainer>
}

export default Legend
