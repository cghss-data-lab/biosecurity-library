import React from 'react'
import { useState } from 'react'
import styled, { useTheme } from 'styled-components'

import AirtableCMSIcon from '../../../airtable-cms/AirtableCMSIcon'

const ExpandButton = styled.button`
  border: none;
  background: none;
  margin-left: auto;
`
const ReturnButton = styled.button<{ hover: boolean }>`
  border: none;
  background: none;
  margin-right: auto;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colorWhite};

  ${({ hover, theme }) => hover && `color: ${theme.colorGolden};`}
`

export const Expand: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const theme: any = useTheme()
  return (
    <ExpandButton onClick={onClick}>
      <AirtableCMSIcon
        name="Expand column"
        color={theme.colorWhite}
        hoverColor={theme.colorGolden}
      />
    </ExpandButton>
  )
}

export const Return: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const theme: any = useTheme()

  const [hover, setHover] = useState(false)

  return (
    <ReturnButton
      onClick={onClick}
      hover={hover}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <AirtableCMSIcon
        name="Return"
        color={hover ? theme.colorGolden : theme.colorWhite}
        style={{ marginTop: 2 }}
      />
      Return to all
    </ReturnButton>
  )
}
