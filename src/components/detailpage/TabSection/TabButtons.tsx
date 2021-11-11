import React from 'react'
import styled from 'styled-components'

import { Tab } from './TabSection'

const ButtonColumn = styled.section`
  grid-area: tabs;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  // border-top: 8px solid ${({ theme }) => theme.colorDarkest};
`
const Button = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colorDarkest};
  border-left: 1px solid ${({ theme }) => theme.colorDarkest};
  padding: 17px 20px;
  text-align: left;
  color: ${({ theme }) => theme.colorDarkest};
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-size: 16px;
  transition: 150ms;

  &:last-of-type {
    // border-bottom: 1px solid ${({ theme }) => theme.colorMedGray};
  }

  &:hover {
    background: ${({ theme }) => theme.colorDarker};
    ${({ active, theme }) => active && `background: ${theme.colorDarker};`}
    color: white;
  }

  ${({ active, theme }) =>
    active &&
    `background: ${theme.colorDarker}; 
    font-weight: 600;
    color: white;
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
