import React from 'react'
import styled, { useTheme } from 'styled-components'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import useDefinitions from 'airtableQueryHooks/useDefinitions'
import { ExploreState } from 'pages/explore'

import CMS from '@talus-analytics/library.airtable-cms'
import { cleanAirtableKey } from 'airtable-cms/utilities'

import FilterSection from './FilterSection'
import { toggleFilter } from './filterOperations'
import DefinitionPopup from './DefinitionPopup'

const DefinitionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
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
  /* width: 200px; */
  min-height: 53px;
  text-align: left;
  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.15),
    inset 0 0 8px 0px rgba(255, 255, 255, 0.5);

  border: 1px solid rgba(0, 0, 0, 0.05);
  font-family: 'Open sans', Arial, Helvetica, sans-serif;
  font-size: 16px;

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

const FilterBar = ({
  exploreState,
  setExploreState,
}: FilterProps): JSX.Element => {
  const theme: any = useTheme()
  const definitions = useDefinitions()

  const activeDefinitions =
    exploreState.defs !== undefined &&
    definitions.filter(def =>
      def.data.Column.some(col =>
        exploreState.defs?.includes(cleanAirtableKey(col))
      )
    )

  return (
    <>
      <DefinitionsContainer>
        {activeDefinitions &&
          activeDefinitions
            .sort((a, b) => a.data.Name.localeCompare(b.data.Name))
            .map(def => (
              <Tippy
                theme="light"
                maxWidth="600px"
                key={def.data.Name}
                content={
                  <DefinitionPopup
                    name={def.data.Name}
                    definition={def.data.Definition}
                  />
                }
              >
                <DefinitionButton
                  onClick={() => {
                    toggleFilter(
                      { [exploreState.defs!]: [def.data.Name] },
                      setExploreState
                    )
                  }}
                  active={exploreState.filters?.[
                    exploreState.defs! as keyof typeof exploreState.filters
                  ]?.includes(def.data.Name)}
                >
                  <CMS.Icon
                    noEmitError
                    name={def.data.Name}
                    color={theme.colorBlack}
                    style={{ width: 30, marginRight: 10 }}
                  />
                  {def.data.Name}
                </DefinitionButton>
              </Tippy>
            ))}
      </DefinitionsContainer>
      <FilterSection {...{ exploreState, setExploreState }} />
    </>
  )
}

export default FilterBar
