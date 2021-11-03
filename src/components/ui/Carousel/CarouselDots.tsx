import React from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 15px;
`
const PageButton = styled.button<{
  active: boolean
  dotColor: string
  inactiveDotColor: string
}>`
  border: none;
  background: none;
  width: 15px;
  height: 15px;
  background-color: ${({ inactiveDotColor }) => inactiveDotColor};
  border-radius: 50%;
  margin-right: 25px;

  &:last-of-type {
    margin-right: 0;
  }

  ${({ active, dotColor }) =>
    active &&
    `
    background-color: ${dotColor}
  `}
`

interface CarouselDotsProps {
  activeIndex: number
  pages: ReturnType<typeof React.Children.toArray>
  onClick: (e: React.MouseEvent, index: number) => void
  dotColor: string
  inactiveDotColor: string
}

const CarouselDots = ({
  pages,
  activeIndex,
  onClick,
  dotColor,
  inactiveDotColor,
}: CarouselDotsProps): JSX.Element => (
  <ButtonContainer>
    {pages.map((_, index) => (
      <PageButton
        key={index}
        active={index === activeIndex}
        onClick={e => onClick(e, index)}
        {...{ dotColor, inactiveDotColor }}
      />
    ))}
  </ButtonContainer>
)

export default CarouselDots
