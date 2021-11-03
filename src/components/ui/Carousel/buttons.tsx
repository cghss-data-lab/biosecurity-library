import styled from 'styled-components'

const getNextArrow = (color: string) =>
  `url("data:image/svg+xml,%3Csvg width='19' height='30' viewBox='0 0 19 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.475037 26.475L11.925 15L0.475037 3.525L4.00004 0L19 15L4.00004 30L0.475037 26.475Z' fill='${encodeURIComponent(
    color
  )}'/%3E%3C/svg%3E%0A")`

const getPrevArrow = (color: string) =>
  `url("data:image/svg+xml,%3Csvg width='19' height='30' viewBox='0 0 19 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18.525 3.525L7.07496 15L18.525 26.475L15 30L-3.8147e-05 15L15 0L18.525 3.525Z' fill='${encodeURIComponent(
    color
  )}'/%3E%3C/svg%3E%0A")`

const Button = styled.button<{ color: string; disabledColor: string }>`
  background: none;
  border: none;
  width: 20px;
  height: 50px;
  position: absolute;
  top: calc(50% - 25px);
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
`
export const PrevButton = styled(Button)`
  left: -35px;
  background-image: ${({ color }) => getPrevArrow(color)};

  &:disabled {
    background-image: ${({ disabledColor }) => getPrevArrow(disabledColor)};
  }
`
export const NextButton = styled(Button)`
  right: -35px;
  background-image: ${({ color }) => getNextArrow(color)};

  &:disabled {
    background-image: ${({ disabledColor }) => getNextArrow(disabledColor)};
  }
`
