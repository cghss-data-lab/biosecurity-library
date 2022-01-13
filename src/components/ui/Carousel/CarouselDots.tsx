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
  transition: number
}>`
  position: relative;
  border: none;
  background: none;
  width: 15px;
  height: 15px;
  background-color: ${({ inactiveDotColor }) => inactiveDotColor};
  border-radius: 50%;
  margin-right: 25px;
  transition: ${({ transition }) => transition}ms ease;
  opacity: 1;

  &:last-of-type {
    margin-right: 0;
  }

  &:after {
    position: absolute;
    content: '';
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ dotColor }) => dotColor};
    border-radius: 50%;
    transition: 150ms ease;
    opacity: 0;
  }

  &:hover {
    &:after {
      opacity: 0.5;
    }
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
  transition: number
}

const CarouselDots = ({
  pages,
  activeIndex,
  onClick,
  dotColor,
  inactiveDotColor,
  transition,
}: CarouselDotsProps): JSX.Element => (
  <ButtonContainer>
    {pages.map((_, index) => (
      <PageButton
        key={index}
        active={index === activeIndex}
        onClick={e => onClick(e, index)}
        {...{ dotColor, inactiveDotColor, transition }}
      />
    ))}
  </ButtonContainer>
)

export default CarouselDots
