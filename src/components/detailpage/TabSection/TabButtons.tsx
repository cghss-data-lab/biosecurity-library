import React from 'react'
import styled, { StyledProps } from 'styled-components'

import { Tab } from './TabSection'

const ButtonColumn = styled.section`
  grid-area: tabs;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-top: none;
`

interface ButtonProps {
  readonly active: boolean
}

const Button = styled.button<ButtonProps>`
  background: none;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colorMedGray};
  border-left: 1px solid ${({ theme }) => theme.colorMedGray};
  padding: 17px 20px;
  text-align: left;
  color: ${({ theme }) => theme.colorDarkest};

  &:last-of-type {
    border-bottom: 1px solid ${({ theme }) => theme.colorMedGray};
  }

  &:hover {
    background: ${({ theme }) => theme.colorVeryLightGray};

    ${({ active, theme }) =>
      active &&
      `
    background: ${theme.colorLightest};
  `}
  }

  ${({ active, theme }) =>
    active &&
    `
    background: ${theme.colorLightest};
    font-weight: 600;
  `}
`

interface TabButtonsProps {
  tabs: Tab[]
  activeTab: Tab
  setActiveTab: React.Dispatch<React.SetStateAction<Tab>>
}

const TabButtons: React.FC<TabButtonsProps> = ({
  tabs,
  activeTab,
  setActiveTab,
}) => {
  return (
    <ButtonColumn>
      {tabs.map(tab => (
        <Button
          key={tab.id}
          active={activeTab.id === tab.id}
          onClick={() => setActiveTab(tab)}
        >
          {tab.label}
        </Button>
      ))}
    </ButtonColumn>
  )
}

export default TabButtons
