import React from 'react'
import styled, { useTheme } from 'styled-components'

import CMS from '@talus-analytics/library.airtable-cms'

import { ExploreState } from '../../../pages/explore'
import Tippy from '@tippyjs/react'

interface ButtonProps {
  name: string
  exploreState: ExploreState
  setExploreState: React.Dispatch<React.SetStateAction<ExploreState>>
}

const Button = styled.button<{ open: boolean }>`
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
    background-color: ${({ theme }) => theme.colorYellow};
  }

  ${({ theme, open }) => open && `background-color: ${theme.colorGolden};`}

  @media(max-width: 700px) {
    display: none;
  }
`

// const CollapseIcon = styled(CMS.Icon)`
//   @media (max-width: 700px) {
//     display: none;
//   }
// `

const ExpandDefinitionsButton: React.FC<ButtonProps> = ({
  name,
  exploreState,
  setExploreState,
}) => {
  const theme: any = useTheme()
  return (
    <Tippy content="Click to expand all options">
      <Button
        open={exploreState.defs === name}
        onClick={() =>
          setExploreState(prev => {
            if (prev.defs !== name) return { ...prev, defs: name }
            const { defs: _, ...next } = prev
            return next
          })
        }
      >
        {exploreState.defs === name ? (
          <CMS.Icon
            name={'Collapse topic'}
            color={theme.colorBlack}
            style={{ width: 20, height: 20 }}
          />
        ) : (
          <CMS.Icon
            name={'Expand topic'}
            color={theme.colorBlack}
            style={{ width: 20, height: 20 }}
          />
        )}
      </Button>
    </Tippy>
  )
}

export default ExpandDefinitionsButton
