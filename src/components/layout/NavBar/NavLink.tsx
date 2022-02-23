import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  color: white !important;
  padding: 14px;
  text-decoration: none;
  transition: 500ms ease;
  font-weight: 400;
  font-family: 'Open sans', Arial, Helvetica, sans-serif;

  &:hover {
    // background-color: ${({ theme }) => theme.colorVeryDarkGray};
    transition: 150ms ease;
    text-decoration: none !important;
    color: ${({ theme }) => theme.colorGolden} !important;
  }
`
const defaultActiveStyle = {
  fontWeight: '600',
}

interface Props {
  to: string
  activeStyle?: object
  children: React.ReactNode
  className?: string
}

const NavLink = ({ to, activeStyle, className, ...props }: Props) => (
  <StyledLink
    {...{ props }}
    to={to}
    activeStyle={activeStyle || defaultActiveStyle}
    className={className}
  >
    {props.children}
  </StyledLink>
)

export default NavLink
