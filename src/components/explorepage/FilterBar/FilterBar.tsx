import React from 'react'
import styled, { useTheme } from 'styled-components'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css' // optional

import { Definition, ExploreState } from '../../../pages/explore'

import FilterSection from './FilterSection'
import { cleanAirtableKey } from '../../../airtable-cms/utilities'
import { toggleFilter } from './filterOperations'
import AirtableCMSIcon from '../../../airtable-cms/AirtableCMSIcon'

const DefinitionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`
const DefinitionButton = styled.button<{ active: boolean | undefined }>`
  border: none;
  background: none;
  padding: 10px 15px;
  border: 1px solid darkgrey;
  /* margin: 10px; */
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.025);
  display: flex;
  align-items: center;
  width: 200px;
  min-height: 53px;
  text-align: left;

  &:hover {
    background-color: ${({ theme }) => theme.colorLightest};
  }

  ${({ active, theme }) =>
    active &&
    `
      background: ${theme.colorLighter};
      &:hover {
        background-color: ${theme.colorLighter};
      }
    `}
`

export interface FilterProps {
  exploreState: ExploreState
  setExploreState: React.Dispatch<React.SetStateAction<ExploreState>>
}

interface FilterBarProps extends FilterProps {
  definitions: Definition[]
}

const FilterBar: React.FC<FilterBarProps> = ({
  definitions,
  exploreState,
  setExploreState,
}) => {
  const theme: any = useTheme()
  return (
    <>
      <DefinitionsContainer>
        {exploreState.defs &&
          definitions
            .filter(def =>
              def.data.Column.some(col =>
                exploreState.defs?.includes(cleanAirtableKey(col))
              )
            )
            .map(def => (
              <Tippy key={def.data.Glossary_Name} content={def.data.Definition}>
                <DefinitionButton
                  onClick={() => {
                    toggleFilter(
                      { [exploreState.defs!]: [def.data.Glossary_Name] },
                      setExploreState
                    )
                  }}
                  active={exploreState.filters?.[
                    exploreState.defs! as keyof typeof exploreState.filters
                  ]?.includes(def.data.Glossary_Name)}
                >
                  <AirtableCMSIcon
                    name={def.data.Glossary_Name}
                    color={theme.colorBlack}
                    style={{ width: 30, marginRight: 10 }}
                  />
                  {def.data.Glossary_Name}
                </DefinitionButton>
              </Tippy>
            ))}
      </DefinitionsContainer>
      <FilterSection {...{ exploreState, setExploreState }} />
    </>
  )
}

export default FilterBar
