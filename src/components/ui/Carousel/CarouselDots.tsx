import React from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 15px;
`
const PageButton = styled.button<{ active: boolean }>`
  border: none;
  background: none;
  width: 15px;
  height: 15px;
  background-color: ${({ theme }) => theme.colorLightGray};
  border-radius: 50%;
  margin-right: 25px;

  &:last-of-type {
    margin-right: 0;
  }

  ${({ active, theme }) =>
    active &&
    `
    background-color: ${theme.colorDarkest}
  `}
`

interface CarouselDotsProps {
  activeIndex: number
  pages: ReturnType<typeof React.Children.toArray>
  onClick: (e: React.MouseEvent, index: number) => void
}

const CarouselDots = ({
  pages,
  activeIndex,
  onClick,
}: CarouselDotsProps): JSX.Element => (
  <ButtonContainer>
    {pages.map((_, index) => (
      <PageButton
        key={index}
        active={index === activeIndex}
        onClick={e => onClick(e, index)}
      />
    ))}
  </ButtonContainer>
)

export default CarouselDots
