import Dropdown from 'components/ui/Dropdown'
import React from 'react'
import styled from 'styled-components'
import HamburgerButton from '../HamburgerButton/HamburgerButton'

const MenuContainer = styled.div`
  @media (min-width: 599px) {
    display: none;
  }
`

interface MobileMenuProps {
  children: React.ReactNode
}

const MobileMenu = ({ children }: MobileMenuProps) => {
  return (
    <MenuContainer>
      <Dropdown
        expanderStyle={{
          width: '100vw',
          background: 'none',
          right: 0,
        }}
        renderButton={open => <HamburgerButton open={open} />}
      >
        {children}
      </Dropdown>
    </MenuContainer>
  )
}

export default MobileMenu
