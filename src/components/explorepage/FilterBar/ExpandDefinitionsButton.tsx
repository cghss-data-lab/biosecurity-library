import React from 'react'
import styled, { useTheme } from 'styled-components'
import AirtableCMSIcon from '../../../airtable-cms/AirtableCMSIcon'

import { ExploreState } from '../../../pages/explore'

interface ButtonProps {
  name: string
  exploreState: ExploreState
  setExploreState: React.Dispatch<React.SetStateAction<ExploreState>>
}

const Button = styled.button`
  background: none;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0);
  transition: 250ms ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colorGolden};
  }
`

const ExpandDefinitionsButton: React.FC<ButtonProps> = ({
  name,
  exploreState,
  setExploreState,
}) => {
  const theme: any = useTheme()
  return (
    <Button
      onClick={() =>
        setExploreState(prev => {
          if (prev.defs !== name) return { ...prev, defs: name }
          const { defs: _, ...next } = prev
          return next
        })
      }
    >
      {exploreState.defs === name ? (
        <AirtableCMSIcon
          name={'Collapse topic'}
          color={theme.colorBlack}
          style={{ width: 20, height: 20 }}
        />
      ) : (
        <AirtableCMSIcon
          name={'Expand topic'}
          color={theme.colorBlack}
          style={{ width: 20, height: 20 }}
        />
      )}
    </Button>
  )
}

export default ExpandDefinitionsButton
