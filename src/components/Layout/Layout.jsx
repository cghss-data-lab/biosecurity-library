import React from 'react'
import styled from 'styled-components'

import FigmaProvider from '../../figma/FigmaProvider'
import NavBar from '../NavBar/NavBar'

import './fonts.css'

// placeholder component for handling layout.
// this component should wrap children in
// FigmaProvider so that styled-components
// can access all the scss variables exported
// from the figma design document.

const Main = styled.main`
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 30px;
`

const Layout = ({ children }) => (
  <FigmaProvider>
    <NavBar />
    <Main>{children}</Main>
  </FigmaProvider>
)
export default Layout
