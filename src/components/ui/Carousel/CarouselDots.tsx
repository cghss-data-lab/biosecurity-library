import React from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const PageButton = styled.button<{ active: boolean }>`
  border: none;
  background: none;
  width: 15px;
  height: 15px;
  background-color: ${({ theme }) => theme.colorLightGray};
  border-radius: 50%;
  margin-right: 25px;

  ${({ active, theme }) =>
    active &&
    `
    background-color: ${theme.colorDarkest}
  `}
`

interface CarouselDotsProps {
  pages: React.ReactElement[]
  activeIndex: number
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
