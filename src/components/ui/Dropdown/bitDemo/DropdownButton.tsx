import styled from 'styled-components'

const DropdownButton = styled.button<{ open: boolean; animDuration: number }>`
  background-color: ${({ open }) => (open ? 'skyblue' : 'slategrey')};
  transition: ${({ animDuration }) => animDuration + 'ms ease'};
  color: ${({ open }) => (open ? 'black' : 'white')};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 10px 15px;
  border: none;
`

export default DropdownButton
