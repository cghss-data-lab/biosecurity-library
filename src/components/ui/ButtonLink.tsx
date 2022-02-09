import styled from 'styled-components'

import { Link } from 'gatsby'

const Button = styled(Link)`
  color: ${({ theme }) => theme.colorBlack} !important;
  text-decoration: none !important;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colorGolden};
  border-radius: 2px;
  padding: 10px 20px;
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  box-shadow: 0px 1.5px 4px rgba(0, 0, 0, 0.25);
  transition: 500ms ease;
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    ${({ theme }) => theme.colorGolden};

  &:hover {
    transition: 150ms ease;
    border: 1px solid ${({ theme }) => theme.colorYellow};
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.4) 0%,
        rgba(255, 255, 255, 0) 100%
      ),
      ${({ theme }) => theme.colorYellow};
  }
`

export default Button
