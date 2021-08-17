import React from 'react'
import styled from 'styled-components'

import FigmaProvider from '../../figma/FigmaProvider'

import './fonts.css'

// placeholder component for handling layout.
// this component should wrap children in
// FigmaProvider so that styled-components
// can access all the scss variables exported
// from the figma design document.

const Main = styled.main`
  padding: 15%;
`

const Layout = ({ children }) => (
  <FigmaProvider>
    <Main>{children}</Main>
  </FigmaProvider>
)
export default Layout
