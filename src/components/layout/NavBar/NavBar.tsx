import React from 'react'
import styled from 'styled-components'
import NavLink from './NavLink'

const Nav = styled.nav`
  // background-color: ${({ theme }) => theme.colorBlack};
  background-color: #05213a;
  position: fixed;
  width: 100%;
  z-index: 50;
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.24);
`
const Container = styled.div`
  margin: 0 auto;
  max-width: 1500px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`
const LinkList = styled.ol`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
`
const HomeLink = styled(NavLink)`
  font-family: 'Open Sans', sans-serif;
  font-weight: 900;
  font-size: 18px;
  color: white;
  padding: 30px;
  margin-left: auto;
`

const NavBar: React.FC = () => (
  <Nav>
    <Container>
      <HomeLink activeStyle={{}} to="/">
        Biosecurity Library
      </HomeLink>
      <LinkList>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/explore/">Explore</NavLink>
        <NavLink to="/about/">About</NavLink>
      </LinkList>
    </Container>
  </Nav>
)

export default NavBar
