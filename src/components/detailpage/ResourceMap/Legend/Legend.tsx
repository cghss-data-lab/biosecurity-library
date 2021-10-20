import React, { FC } from 'react'
import styled from 'styled-components'

const LegendContainer = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-flow: column;
  justify-items: baseline;
  > div:not(:first-child) {
    margin-top: 1em;
  }

  background-color: rgba(255, 255, 255, 0.5);
`

interface LegendProps extends React.HTMLAttributes<HTMLDivElement> {}

const Legend: FC<LegendProps> = ({ children }) => {
  return <LegendContainer>{children}</LegendContainer>
}

export default Legend
