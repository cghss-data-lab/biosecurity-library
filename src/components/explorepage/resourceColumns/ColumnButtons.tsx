import React from 'react'
import { useState } from 'react'
import styled, { useTheme } from 'styled-components'

import CMSIcon from '../../../airtable-cms/CMSIcon/CMSIcon'

const ExpandButton = styled.button`
  grid-area: expand;
  border: none;
  background: none;
  margin-left: auto;
`
const ReturnButton = styled.button<{ hover: boolean }>`
  grid-area: return;
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
      <CMS.Icon
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
      <CMSIcon
        name="Return"
        color={hover ? theme.colorGolden : theme.colorWhite}
        style={{ marginTop: 2 }}
      />
      Return to all
    </ReturnButton>
  )
}
