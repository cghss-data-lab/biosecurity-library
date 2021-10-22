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
  active: number
  setActive: React.Dispatch<React.SetStateAction<number>>
}

const CarouselDots = ({
  pages,
  active,
  setActive,
}: CarouselDotsProps): JSX.Element => (
  <ButtonContainer>
    {pages.map((_, index) => (
      <PageButton
        key={index}
        active={index === active}
        onClick={() => setActive(index)}
      />
    ))}
  </ButtonContainer>
)

export default CarouselDots
