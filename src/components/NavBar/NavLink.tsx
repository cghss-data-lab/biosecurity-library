import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  font-family: 'Open Sans', sans-serif;
  font-weight: 200;
  font-size: 18px;
  color: white;
  padding: 30px;
  text-decoration: none;
  transition: 500ms ease;
  &:hover {
    background-color: ${({ theme }) => theme.colorVeryDarkGray};
    transition: 150ms ease;
  }
`
const defaultActiveStyle = {
  fontWeight: '900',
}

interface Props {
  to: string
  props?: any
  activeStyle?: object
}

const NavLink: React.FC<Props> = ({ to, activeStyle, ...props }) => (
  <StyledLink
    to={to}
    activeStyle={activeStyle || defaultActiveStyle}
    {...{ props }}
  >
    {props.children}
  </StyledLink>
)

export default NavLink
